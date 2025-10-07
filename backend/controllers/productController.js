const Product = require('../models/Product');
const Cooperative = require('../models/Cooperative');

/**
 * Product controller with CRUD operations and business logic
 * Includes proper error handling and validation
 */

// @desc    Get all products with filtering and pagination
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const {
      category,
      cooperative,
      minPrice,
      maxPrice,
      search,
      page = 1,
      limit = 12,
      sort = '-createdAt'
    } = req.query;

    // Build filter object
    let filter = { status: 'active' };
    
    if (category) filter.category = category;
    if (cooperative) filter.cooperative = cooperative;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    // Text search across multiple fields
    if (search) {
      filter.$text = { $search: search };
    }

    // Execute query with population and pagination
    const products = await Product.find(filter)
      .populate('cooperative', 'name logo rating')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Get total count for pagination
    const total = await Product.countDocuments(filter);

    res.json({
      success: true,
      count: products.length,
      total,
      pagination: {
        page: Number(page),
        pages: Math.ceil(total / limit)
      },
      data: products
    });

  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching products'
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('cooperative', 'name description logo rating contact');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Increment view count (analytics)
    product.views += 1;
    await product.save();

    res.json({
      success: true,
      data: product
    });

  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching product'
    });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Seller/Admin)
const createProduct = async (req, res) => {
  try {
    // Add cooperative from authenticated user
    req.body.cooperative = req.user.cooperative;

    // Handle image uploads
    if (req.files && req.files.length > 0) {
      req.body.images = req.files.map((file, index) => ({
        url: `/uploads/${file.filename}`,
        altText: req.body.imageAltTexts?.[index] || `Product image ${index + 1}`,
        isPrimary: index === 0
      }));
    }

    const product = await Product.create(req.body);

    // Populate cooperative info for response
    await product.populate('cooperative', 'name logo');

    res.status(201).json({
      success: true,
      data: product
    });

  } catch (error) {
    console.error('Create product error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating product'
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Seller/Admin)
const updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if user owns the product or is admin
    if (product.cooperative.toString() !== req.user.cooperative?.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this product'
      });
    }

    // Handle new image uploads
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file, index) => ({
        url: `/uploads/${file.filename}`,
        altText: req.body.imageAltTexts?.[index] || `Product image ${index + 1}`,
        isPrimary: index === 0 && product.images.length === 0
      }));
      req.body.images = [...product.images, ...newImages].slice(0, 5); // Max 5 images
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('cooperative', 'name logo');

    res.json({
      success: true,
      data: product
    });

  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating product'
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Seller/Admin)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Authorization check
    if (product.cooperative.toString() !== req.user.cooperative?.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this product'
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting product'
    });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};