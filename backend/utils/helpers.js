/**
 * Utility functions for common operations
 * Reusable helper functions across the application
 */

/**
 * Format currency based on user preferences
 * Supports MAD and other currencies
 */
const formatCurrency = (amount, currency = 'MAD', language = 'en') => {
  const formatter = new Intl.NumberFormat(getLocaleFromLanguage(language), {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return formatter.format(amount);
};

/**
 * Convert language code to locale for formatting
 */
const getLocaleFromLanguage = (language) => {
  const locales = {
    en: 'en-US',
    fr: 'fr-FR',
    ar: 'ar-MA'
  };
  return locales[language] || 'en-US';
};

/**
 * Generate random string for various purposes
 * Used for SKUs, order numbers, etc.
 */
const generateRandomString = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Sanitize object by removing undefined/null fields
 * Useful for update operations
 */
const sanitizeObject = (obj) => {
  const sanitized = { ...obj };
  Object.keys(sanitized).forEach(key => {
    if (sanitized[key] === undefined || sanitized[key] === null) {
      delete sanitized[key];
    }
  });
  return sanitized;
};

/**
 * Calculate pagination metadata
 */
const getPagination = (page, limit, total) => {
  const totalPages = Math.ceil(total / limit);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  return {
    page: parseInt(page),
    limit: parseInt(limit),
    total,
    totalPages,
    hasNext,
    hasPrev,
    nextPage: hasNext ? page + 1 : null,
    prevPage: hasPrev ? page - 1 : null
  };
};

/**
 * Validate email format
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Format phone number for Morocco
 */
const formatPhoneNumber = (phone) => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if it's a Moroccan phone number
  if (cleaned.length === 10 && cleaned.startsWith('0')) {
    return `+212${cleaned.slice(1)}`;
  }
  
  if (cleaned.length === 12 && cleaned.startsWith('212')) {
    return `+${cleaned}`;
  }
  
  return phone;
};

/**
 * Calculate distance between two coordinates (Haversine formula)
 * Useful for location-based features
 */
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return distance;
};

/**
 * Debounce function for search operations
 */
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Generate SEO-friendly slug from string
 */
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

/**
 * Truncate text to specified length
 */
const truncateText = (text, length = 100) => {
  if (text.length <= length) return text;
  return text.substr(0, length) + '...';
};

module.exports = {
  formatCurrency,
  getLocaleFromLanguage,
  generateRandomString,
  sanitizeObject,
  getPagination,
  isValidEmail,
  formatPhoneNumber,
  calculateDistance,
  debounce,
  generateSlug,
  truncateText
};