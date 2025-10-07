const Order = require('../models/Order');
const Product = require('../models/Product');
const Cooperative = require('../models/Cooperative');

/**
 * Order management controller with multi-vendor support
 * Handles order creation, tracking, and cooperative-specific orders
 */

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, notes } = req.body;

    // Validate items
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order must have at least one item'
      });
    }

    // Calculate order details and validate products
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.product}`
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for product: ${product.name}`
        });
      }

      const itemSubtotal = product.price * item.quantity;
      subtotal += itemSubtotal;

      orderItems.push({
        product: product._id,
        cooperative: product.cooperative,
        quantity: item.quantity,
        price: product.price,
        subtotal: itemSubtotal
      });
    }

    // Calculate totals (simplified for demo)
    const shippingFee = subtotal > 500 ? 0 : 50; // Free shipping over 500 MAD
    const taxAmount = subtotal * 0.1; // 10% VAT
    const total = subtotal + shippingFee + taxAmount;

    // Create order
    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      subtotal,
      shippingFee,
      taxAmount,
      total,
      shippingAddress,
      payment: { method: paymentMethod },
      notes: { customer: notes }
    });

    // Update product stocks
    for (const item of items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity, salesCount: item.quantity } }
      );
    }

    // Update cooperative sales
    const cooperativeUpdates = orderItems.reduce((acc, item) => {
      if (!acc[item.cooperative]) {
        acc[item.cooperative] = 0;
      }
      acc[item.cooperative] += item.subtotal;
      return acc;
    }, {});

    for (const [cooperativeId, amount] of Object.entries(cooperativeUpdates)) {
      await Cooperative.findByIdAndUpdate(
        cooperativeId,
        { $inc: { totalSales: amount } }
      );
    }

    await order.populate('items.product', 'name images');
    await order.populate('items.cooperative', 'name logo');

    res.status(201).json({
      success: true,
      data: order,
      message: 'Order created successfully'
    });

  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating order'
    });
  }
};

// @desc    Get all orders for user
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    let filter = { user: req.user.id };
    if (status) filter.status = status;

    const orders = await Order.find(filter)
      .populate('items.product', 'name images category')
      .populate('items.cooperative', 'name logo')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Order.countDocuments(filter);

    res.json({
      success: true,
      count: orders.length,
      total,
      pagination: {
        page: Number(page),
        pages: Math.ceil(total / limit)
      },
      data: orders
    });

  } catch (error) {
    console.error('Get my orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching orders'
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'username email profile')
      .populate('items.product', 'name images specifications')
      .populate('items.cooperative', 'name logo contact');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns the order or is admin/cooperative owner
    if (order.user._id.toString() !== req.user.id && 
        req.user.role !== 'admin' && 
        !order.items.some(item => item.cooperative._id.toString() === req.user.cooperative?.toString())) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this order'
      });
    }

    res.json({
      success: true,
      data: order
    });

  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching order'
    });
  }
};

// @desc    Get orders for cooperative
// @route   GET /api/orders/cooperative/myorders
// @access  Private/Seller
const getCooperativeOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    if (!req.user.cooperative) {
      return res.status(400).json({
        success: false,
        message: 'User is not associated with a cooperative'
      });
    }

    let filter = { 'items.cooperative': req.user.cooperative };
    if (status) filter.status = status;

    const orders = await Order.find(filter)
      .populate('user', 'username email profile')
      .populate('items.product', 'name images')
      .populate('items.cooperative', 'name logo')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Filter items to only show items from this cooperative
    orders.forEach(order => {
      order.items = order.items.filter(item => 
        item.cooperative._id.toString() === req.user.cooperative.toString()
      );
    });

    const total = await Order.countDocuments(filter);

    res.json({
      success: true,
      count: orders.length,
      total,
      pagination: {
        page: Number(page),
        pages: Math.ceil(total / limit)
      },
      data: orders
    });

  } catch (error) {
    console.error('Get cooperative orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching cooperative orders'
    });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin/Seller
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Authorization check
    const isCooperativeOwner = order.items.some(
      item => item.cooperative.toString() === req.user.cooperative?.toString()
    );

    if (order.user.toString() !== req.user.id && 
        req.user.role !== 'admin' && 
        !isCooperativeOwner) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this order'
      });
    }

    // Update status and timeline
    order.status = status;
    if (status === 'confirmed') order.timeline.confirmed = new Date();
    if (status === 'processing') order.timeline.processed = new Date();
    if (status === 'shipped') order.timeline.shipped = new Date();
    if (status === 'delivered') order.timeline.delivered = new Date();

    await order.save();

    res.json({
      success: true,
      data: order,
      message: 'Order status updated successfully'
    });

  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating order status'
    });
  }
};

// @desc    Get all orders (Admin only)
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, cooperative } = req.query;

    let filter = {};
    if (status) filter.status = status;
    if (cooperative) filter['items.cooperative'] = cooperative;

    const orders = await Order.find(filter)
      .populate('user', 'username email profile')
      .populate('items.product', 'name images')
      .populate('items.cooperative', 'name logo')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Order.countDocuments(filter);

    res.json({
      success: true,
      count: orders.length,
      total,
      pagination: {
        page: Number(page),
        pages: Math.ceil(total / limit)
      },
      data: orders
    });

  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching orders'
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrder,
  getCooperativeOrders,
  updateOrderStatus,
  getAllOrders
};