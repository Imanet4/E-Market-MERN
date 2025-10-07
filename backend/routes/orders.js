const express = require('express');
const {
  createOrder,
  getMyOrders,
  getOrder,
  getCooperativeOrders,
  updateOrderStatus,
  getAllOrders
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');
const { validateOrder } = require('../middleware/validation');

const router = express.Router();

/**
 * Order management routes
 * Multi-level access: buyers, sellers (cooperatives), and admin
 */

// All routes require authentication
router.use(protect);

// Buyer routes
router.post('/', validateOrder, createOrder);
router.get('/myorders', getMyOrders);
router.get('/:id', getOrder);

// Seller/Cooperative routes
router.get('/cooperative/myorders', authorize('seller', 'admin'), getCooperativeOrders);
router.put('/:id/status', authorize('seller', 'admin'), updateOrderStatus);

// Admin-only routes
router.get('/', authorize('admin'), getAllOrders);

module.exports = router;