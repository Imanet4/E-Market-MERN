/**
 * Application constants and configuration
 * Centralized constants for maintainability
 */

// User roles
const USER_ROLES = {
  BUYER: 'buyer',
  SELLER: 'seller',
  ADMIN: 'admin'
};

// Product categories
const PRODUCT_CATEGORIES = {
  EDIBLE_GOODS: 'edible-goods',
  COSMETICS: 'cosmetics',
  CLOTHING: 'clothing',
  ACCESSORIES: 'accessories',
  SOUVENIR_BOXES: 'souvenir-boxes'
};

// Product subcategories for better organization
const PRODUCT_SUBCATEGORIES = {
  [PRODUCT_CATEGORIES.EDIBLE_GOODS]: [
    'argan-oil',
    'amlou',
    'honey',
    'dates',
    'spices',
    'olive-oil',
    'preserves'
  ],
  [PRODUCT_CATEGORIES.COSMETICS]: [
    'face-care',
    'body-care',
    'hair-care',
    'soaps',
    'essential-oils',
    'perfumes'
  ],
  [PRODUCT_CATEGORIES.CLOTHING]: [
    'traditional-wear',
    'modern-wear',
    'accessories',
    'footwear',
    'children-wear'
  ],
  [PRODUCT_CATEGORIES.ACCESSORIES]: [
    'jewelry',
    'bags',
    'home-decor',
    'textiles',
    'pottery'
  ],
  [PRODUCT_CATEGORIES.SOUVENIR_BOXES]: [
    'premium-box',
    'standard-box',
    'custom-box',
    'seasonal-box'
  ]
};

// Order status flow
const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded'
};

// Payment methods
const PAYMENT_METHODS = {
  CARD: 'card',
  PAYPAL: 'paypal',
  BANK_TRANSFER: 'bank-transfer',
  CASH_ON_DELIVERY: 'cash-on-delivery'
};

// Payment status
const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded'
};

// Product status
const PRODUCT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  OUT_OF_STOCK: 'out-of-stock',
  DRAFT: 'draft'
};

// Supported languages
const LANGUAGES = {
  ENGLISH: 'en',
  FRENCH: 'fr',
  ARABIC: 'ar'
};

// Supported currencies
const CURRENCIES = {
  MAD: 'MAD',
  USD: 'USD',
  EUR: 'EUR'
};

// File upload constraints
const UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_FILES: 5,
  ALLOWED_MIMETYPES: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif'
  ]
};

// Pagination defaults
const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 100
};

// Shipping configuration
const SHIPPING = {
  FREE_SHIPPING_THRESHOLD: 500, // MAD
  STANDARD_SHIPPING_FEE: 50, // MAD
  EXPRESS_SHIPPING_FEE: 100 // MAD
};

// Tax configuration
const TAX = {
  VAT_RATE: 0.1, // 10%
  INCLUSIVE: false
};

// Rating system
const RATING = {
  MIN: 1,
  MAX: 5
};

// Cache times (in seconds)
const CACHE_TIMES = {
  SHORT: 300, // 5 minutes
  MEDIUM: 1800, // 30 minutes
  LONG: 3600, // 1 hour
  VERY_LONG: 86400 // 24 hours
};

// API response messages
const MESSAGES = {
  // Success messages
  SUCCESS: {
    REGISTER: 'User registered successfully',
    LOGIN: 'Login successful',
    LOGOUT: 'Logged out successfully',
    CREATE: 'Created successfully',
    UPDATE: 'Updated successfully',
    DELETE: 'Deleted successfully',
    VERIFY: 'Verified successfully'
  },
  // Error messages
  ERROR: {
    UNAUTHORIZED: 'Not authorized',
    FORBIDDEN: 'Access forbidden',
    NOT_FOUND: 'Resource not found',
    VALIDATION: 'Validation failed',
    SERVER: 'Server error',
    DUPLICATE: 'Duplicate entry found',
    INSUFFICIENT_STOCK: 'Insufficient stock'
  }
};

// Moroccan regions for address system
const MOROCCAN_REGIONS = [
  'Tanger-Tétouan-Al Hoceïma',
  'Oriental',
  'Fès-Meknès',
  'Rabat-Salé-Kénitra',
  'Béni Mellal-Khénifra',
  'Casablanca-Settat',
  'Marrakech-Safi',
  'Drâa-Tafilalet',
  'Souss-Massa',
  'Guelmim-Oued Noun',
  'Laâyoune-Sakia El Hamra',
  'Dakhla-Oued Ed-Dahab'
];

// Export all constants
module.exports = {
  USER_ROLES,
  PRODUCT_CATEGORIES,
  PRODUCT_SUBCATEGORIES,
  ORDER_STATUS,
  PAYMENT_METHODS,
  PAYMENT_STATUS,
  PRODUCT_STATUS,
  LANGUAGES,
  CURRENCIES,
  UPLOAD_LIMITS,
  PAGINATION,
  SHIPPING,
  TAX,
  RATING,
  CACHE_TIMES,
  MESSAGES,
  MOROCCAN_REGIONS
};