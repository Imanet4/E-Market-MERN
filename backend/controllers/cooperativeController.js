const Cooperative = require('../models/Cooperative');
const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

/**
 * Cooperative management controller
 * Handles cooperative CRUD, analytics, and vendor management
 */

// @desc    Get all cooperatives
// @route   GET /api/cooperatives
// @access  Public
const getCooperatives = async (req, res) => {
  try {
    const { page = 1, limit = 12, category, search, verified } = req.query;

    // Build filter object
    let filter = { isActive: true };
    if (category) filter.categories = category;
    if (verified) filter.isVerified = verified === 'true';
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const cooperatives = await Cooperative.find(filter)
      .select('name description logo rating categories isVerified contact')
      .sort({ 'rating.average': -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Cooperative.countDocuments(filter);

    res.json({
      success: true,
      count: cooperatives.length,
      total,
      pagination: {
        page: Number(page),
        pages: Math.ceil(total / limit)
      },
      data: cooperatives
    });

  } catch (error) {
    console.error('Get cooperatives error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching cooperatives'
    });
  }
};

// @desc    Get single cooperative
// @route   GET /api/cooperatives/:id
// @access  Public
const getCooperative = async (req, res) => {
  try {
    const cooperative = await Cooperative.findById(req.params.id);

    if (!cooperative) {
      return res.status(404).json({
        success: false,
        message: 'Cooperative not found'
      });
    }

    res.json({
      success: true,
      data: cooperative
    });

  } catch (error) {
    console.error('Get cooperative error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching cooperative'
    });
  }
};

// @desc    Create cooperative
// @route   POST /api/cooperatives
// @access  Private/Admin
const createCooperative = async (req, res) => {
  try {
    const cooperative = await Cooperative.create(req.body);

    res.status(201).json({
      success: true,
      data: cooperative,
      message: 'Cooperative created successfully'
    });

  } catch (error) {
    console.error('Create cooperative error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Cooperative with this name already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating cooperative'
    });
  }
};

// @desc    Update cooperative
// @route   PUT /api/cooperatives/:id
// @access  Private/Admin
const updateCooperative = async (req, res) => {
  try {
    const cooperative = await Cooperative.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!cooperative) {
      return res.status(404).json({
        success: false,
        message: 'Cooperative not found'
      });
    }

    res.json({
      success: true,
      data: cooperative,
      message: 'Cooperative updated successfully'
    });

  } catch (error) {
    console.error('Update cooperative error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating cooperative'
    });
  }
};

// @desc    Delete cooperative
// @route   DELETE /api/cooperatives/:id
// @access  Private/Admin
const deleteCooperative = async (req, res) => {
  try {
    const cooperative = await Cooperative.findById(req.params.id);

    if (!cooperative) {
      return res.status(404).json({
        success: false,
        message: 'Cooperative not found'
      });
    }

    // Check if cooperative has products
    const productCount = await Product.countDocuments({ cooperative: req.params.id });
    if (productCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete cooperative with existing products'
      });
    }

    await Cooperative.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Cooperative deleted successfully'
    });

  } catch (error) {
    console.error('Delete cooperative error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting cooperative'
    });
  }
};

// @desc    Get cooperative products
// @route   GET /api/cooperatives/:id/products
// @access  Public
const getCooperativeProducts = async (req, res) => {
  try {
    const { page = 1, limit = 12, category } = req.query;

    let filter = { 
      cooperative: req.params.id,
      status: 'active'
    };
    if (category) filter.category = category;

    const products = await Product.find(filter)
      .populate('cooperative', 'name logo')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

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
    console.error('Get cooperative products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching cooperative products'
    });
  }
};

// @desc    Get cooperative dashboard stats
// @route   GET /api/cooperatives/:id/stats
// @access  Private/Seller/Admin
const getCooperativeStats = async (req, res) => {
  try {
    const cooperativeId = req.params.id;

    // Authorization check
    if (req.user.role !== 'admin' && req.user.cooperative?.toString() !== cooperativeId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access these statistics'
      });
    }

    // Get sales statistics
    const salesStats = await Order.aggregate([
      { $unwind: '$items' },
      { $match: { 'items.cooperative': mongoose.Types.ObjectId(cooperativeId) } },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$items.subtotal' },
          totalOrders: { $sum: 1 },
          totalItemsSold: { $sum: '$items.quantity' },
          averageOrderValue: { $avg: '$items.subtotal' }
        }
      }
    ]);

    // Get product statistics
    const productStats = await Product.aggregate([
      { $match: { cooperative: mongoose.Types.ObjectId(cooperativeId) } },
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          activeProducts: {
            $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
          },
          outOfStockProducts: {
            $sum: { $cond: [{ $eq: ['$status', 'out-of-stock'] }, 1, 0] }
          },
          totalRevenue: { $sum: { $multiply: ['$price', '$salesCount'] } }
        }
      }
    ]);

    // Get recent orders
    const recentOrders = await Order.find({ 'items.cooperative': cooperativeId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'username profile')
      .populate('items.product', 'name images');

    const stats = {
      sales: salesStats[0] || {
        totalSales: 0,
        totalOrders: 0,
        totalItemsSold: 0,
        averageOrderValue: 0
      },
      products: productStats[0] || {
        totalProducts: 0,
        activeProducts: 0,
        outOfStockProducts: 0,
        totalRevenue: 0
      },
      recentOrders
    };

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Get cooperative stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching cooperative statistics'
    });
  }
};

// @desc    Verify cooperative
// @route   PUT /api/cooperatives/:id/verify
// @access  Private/Admin
const verifyCooperative = async (req, res) => {
  try {
    const cooperative = await Cooperative.findByIdAndUpdate(
      req.params.id,
      { isVerified: true },
      { new: true }
    );

    if (!cooperative) {
      return res.status(404).json({
        success: false,
        message: 'Cooperative not found'
      });
    }

    res.json({
      success: true,
      data: cooperative,
      message: 'Cooperative verified successfully'
    });

  } catch (error) {
    console.error('Verify cooperative error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while verifying cooperative'
    });
  }
};

module.exports = {
  getCooperatives,
  getCooperative,
  createCooperative,
  updateCooperative,
  deleteCooperative,
  getCooperativeProducts,
  getCooperativeStats,
  verifyCooperative
};