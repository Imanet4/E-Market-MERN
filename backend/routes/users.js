const express = require('express');
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserStats
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

/**
 * User management routes
 * Admin-only routes for user management
 */

// All routes require authentication
router.use(protect);

// Admin-only routes
router.use(authorize('admin'));

router.route('/')
  .get(getUsers);

router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

router.route('/:id/stats')
  .get(getUserStats);

module.exports = router;