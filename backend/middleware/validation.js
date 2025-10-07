const { body, validationResult } = require('express-validator');

/**
 * Validation middleware using express-validator
 * Centralized validation rules for consistent data integrity
 */

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.param,
        message: error.msg
      }))
    });
  }
  next();
};

// User registration validation
const validateRegistration = [
  body('username')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  
  body('role')
    .isIn(['buyer', 'seller', 'admin'])
    .withMessage('Role must be buyer, seller, or admin'),
  
  body('firstName')
    .optional()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name must be between 1 and 50 characters'),
  
  body('lastName')
    .optional()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name must be between 1 and 50 characters'),
  
  handleValidationErrors
];

// User login validation
const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  handleValidationErrors
];

// Product creation/update validation
const validateProduct = [
  body('name')
    .isLength({ min: 1, max: 100 })
    .withMessage('Product name must be between 1 and 100 characters'),
  
  body('description')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters'),
  
  body('category')
    .isIn(['edible-goods', 'cosmetics', 'clothing', 'accessories', 'souvenir-boxes'])
    .withMessage('Invalid product category'),
  
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
  
  body('specifications.weight')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Weight specification too long'),
  
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  
  handleValidationErrors
];

// Cooperative validation
const validateCooperative = [
  body('name')
    .isLength({ min: 2, max: 100 })
    .withMessage('Cooperative name must be between 2 and 100 characters'),
  
  body('description')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  
  body('contact.email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid contact email'),
  
  body('categories')
    .isArray({ min: 1 })
    .withMessage('At least one category is required'),
  
  body('categories.*')
    .isIn(['edible-goods', 'cosmetics', 'clothing', 'accessories', 'souvenir-boxes'])
    .withMessage('Invalid category'),
  
  handleValidationErrors
];

// Order validation
const validateOrder = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('Order must contain at least one item'),
  
  body('items.*.product')
    .isMongoId()
    .withMessage('Invalid product ID'),
  
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  
  body('shippingAddress.firstName')
    .notEmpty()
    .withMessage('First name is required'),
  
  body('shippingAddress.lastName')
    .notEmpty()
    .withMessage('Last name is required'),
  
  body('shippingAddress.street')
    .notEmpty()
    .withMessage('Street address is required'),
  
  body('shippingAddress.city')
    .notEmpty()
    .withMessage('City is required'),
  
  body('shippingAddress.country')
    .notEmpty()
    .withMessage('Country is required'),
  
  body('paymentMethod')
    .isIn(['card', 'paypal', 'bank-transfer', 'cash-on-delivery'])
    .withMessage('Invalid payment method'),
  
  handleValidationErrors
];

// Password update validation
const validatePasswordUpdate = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('New password must contain at least one lowercase letter, one uppercase letter, and one number'),
  
  handleValidationErrors
];

module.exports = {
  validateRegistration,
  validateLogin,
  validateProduct,
  validateCooperative,
  validateOrder,
  validatePasswordUpdate,
  handleValidationErrors
};