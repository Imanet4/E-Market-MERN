const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');
const { upload, handleUploadErrors } = require('../middleware/upload');

const router = express.Router();

/**
 * Product routes with proper middleware chaining
 * Public routes for browsing, protected routes for management
 */

// Public routes
router.route('/')
  .get(getProducts);

router.route('/:id')
  .get(getProduct);

// Protected routes (Seller/Admin only)
router.use(protect);

router.route('/')
  .post(
    authorize('seller', 'admin'),
    upload.array('images', 5), // Max 5 images as per requirements
    handleUploadErrors,
    createProduct
  );

router.route('/:id')
  .put(
    authorize('seller', 'admin'),
    upload.array('images', 5),
    handleUploadErrors,
    updateProduct
  )
  .delete(
    authorize('seller', 'admin'),
    deleteProduct
  );

module.exports = router;