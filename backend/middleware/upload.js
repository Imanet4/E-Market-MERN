const multer = require('multer');
const path = require('path');
const fs = require('fs');

/**
 * Multer configuration for local file storage
 * Handles product images, cooperative logos, and user avatars
 */

// Ensure upload directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let subfolder = 'general';
    
    // Organize files by type for better management
    if (file.fieldname === 'avatar') {
      subfolder = 'avatars';
    } else if (file.fieldname === 'logo') {
      subfolder = 'logos';
    } else if (file.fieldname === 'bannerImages') {
      subfolder = 'banners';
    } else if (file.fieldname === 'images') {
      subfolder = 'products';
    }
    
    const fullPath = path.join(uploadDir, subfolder);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
    
    cb(null, fullPath);
  },
  filename: function (req, file, cb) {
    // Generate unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    const filename = file.fieldname + '-' + uniqueSuffix + extension;
    cb(null, filename);
  }
});

/**
 * File filter for image validation
 * Supports common image formats
 */
const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/webp',
    'image/gif'
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, WEBP, and GIF images are allowed.'), false);
  }
};

// Configure multer instances for different use cases
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 5 // Maximum 5 files per upload
  },
  fileFilter: fileFilter
});

// Specialized upload configurations
const productUpload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 5 // Maximum 5 images per product as per requirements
  },
  fileFilter: fileFilter
});

const avatarUpload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB for avatars
    files: 1
  },
  fileFilter: fileFilter
});

const logoUpload = multer({
  storage: storage,
  limits: {
    fileSize: 3 * 1024 * 1024, // 3MB for logos
    files: 1
  },
  fileFilter: fileFilter
});

/**
 * Middleware to handle upload errors gracefully
 * Provides user-friendly error messages
 */
const handleUploadErrors = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    let message = 'File upload error';
    
    switch (error.code) {
      case 'LIMIT_FILE_SIZE':
        message = 'File too large. Maximum size is 5MB.';
        break;
      case 'LIMIT_FILE_COUNT':
        message = 'Too many files. Maximum 5 images allowed.';
        break;
      case 'LIMIT_UNEXPECTED_FILE':
        message = 'Unexpected field in file upload.';
        break;
      default:
        message = `File upload error: ${error.message}`;
    }
    
    return res.status(400).json({
      success: false,
      message
    });
  } else if (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  next();
};

/**
 * Utility function to delete file
 * Clean up files when objects are deleted
 */
const deleteFile = (filePath) => {
  const fullPath = path.join(__dirname, '..', filePath);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};

module.exports = {
  upload,
  productUpload,
  avatarUpload,
  logoUpload,
  handleUploadErrors,
  deleteFile
};