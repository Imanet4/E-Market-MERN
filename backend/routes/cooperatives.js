const express = require('express');
const {
  getCooperatives,
  getCooperative,
  createCooperative,
  updateCooperative,
  deleteCooperative,
  getCooperativeProducts,
  getCooperativeStats,
  verifyCooperative
} = require('../controllers/cooperativeController');
const { protect, authorize } = require('../middleware/auth');
const { validateCooperative } = require('../middleware/validation');
const { logoUpload, handleUploadErrors } = require('../middleware/upload');

const router = express.Router();

/**
 * Cooperative management routes
 * Public routes for browsing, protected routes for management
 */

// Public routes
router.route('/')
  .get(getCooperatives);

router.route('/:id')
  .get(getCooperative);

router.route('/:id/products')
  .get(getCooperativeProducts);

// All subsequent routes require authentication
router.use(protect);

// Admin-only routes
router.use(authorize('admin'));

router.route('/')
  .post(
    logoUpload.single('logo'),
    handleUploadErrors,
    validateCooperative,
    createCooperative
  );

router.route('/:id')
  .put(
    logoUpload.single('logo'),
    handleUploadErrors,
    validateCooperative,
    updateCooperative
  )
  .delete(deleteCooperative);

router.route('/:id/stats')
  .get(getCooperativeStats);

router.route('/:id/verify')
  .put(verifyCooperative);

module.exports = router;