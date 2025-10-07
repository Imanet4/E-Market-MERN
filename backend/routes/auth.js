const express = require('express');
const {
  register,
  login,
  logout,
  getMe,
  updateDetails,
  updatePassword
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { 
  validateRegistration, 
  validateLogin, 
  validatePasswordUpdate 
} = require('../middleware/validation');

const router = express.Router();

/**
 * Authentication routes
 * Public routes for registration and login
 * Protected routes for profile management
 */

// Public routes
router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);

// Protected routes (require authentication)
router.use(protect);

router.post('/logout', logout);
router.get('/me', getMe);
router.put('/updatedetails', updateDetails);
router.put('/updatepassword', validatePasswordUpdate, updatePassword);

module.exports = router;