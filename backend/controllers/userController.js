const User = require('../models/User');
const Order = require('../models/Order');

/**
 * User management controller for admin operations
 * Includes user CRUD and analytics
 */

const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;

    // Build filter object
    let filter = {};
    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { 'profile.firstName': { $regex: search, $options: 'i' } },
        { 'profile.lastName': { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(filter)
      .select('-password')
      .populate('cooperative')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(filter);

    res.json({
      success: true,
      count: users.length,
      total,
      pagination: {
        page: Number(page),
        pages: Math.ceil(total / limit)
      },
      data: users
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching users'
    });
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private/Admin
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('cooperative');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching user'
    });
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password').populate('cooperative');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user,
      message: 'User updated successfully'
    });

  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating user'
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account'
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting user'
    });
  }
};

// @desc    Get user dashboard statistics
// @route   GET /api/users/:id/stats
// @access  Private/Admin
const getUserStats = async (req, res) => {
  try {
    const userId = req.params.id;

    // Get user orders statistics
    const ordersStats = await Order.aggregate([
      { $match: { user: mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: '$total' },
          averageOrder: { $avg: '$total' }
        }
      }
    ]);

    // Get recent orders
    const recentOrders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('items.product', 'name images')
      .populate('items.cooperative', 'name');

    const stats = ordersStats[0] || {
      totalOrders: 0,
      totalSpent: 0,
      averageOrder: 0
    };

    res.json({
      success: true,
      data: {
        stats,
        recentOrders
      }
    });

  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching user statistics'
    });
  }
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserStats
};