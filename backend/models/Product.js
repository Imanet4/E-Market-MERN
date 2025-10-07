const mongoose = require('mongoose');

/**
 * Product schema with support for multi-vendor, multi-language, and multiple images
 * Designed for scalability with proper indexing and validation
 */
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  // Multi-language support for international market
  nameTranslations: {
    en: String,
    fr: String,
    ar: String
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  descriptionTranslations: {
    en: String,
    fr: String,
    ar: String
  },
  // Product categorization for better organization and filtering
  category: {
    type: String,
    required: true,
    enum: ['edible-goods', 'cosmetics', 'clothing', 'accessories', 'souvenir-boxes']
  },
  subcategory: String, // e.g., 'argan-oil', 'amlu' for edible-goods
  // Multi-vendor support - product belongs to a cooperative
  cooperative: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cooperative',
    required: true
  },
  // Pricing in MAD with support for discounts
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  comparePrice: {
    type: Number,
    min: 0
  },
  // Inventory management
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  sku: {
    type: String,
    unique: true,
    sparse: true
  },
  // Multiple images support as per requirements (up to 5)
  images: [{
    url: String,
    altText: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  // Product specifications
  specifications: {
    weight: String,
    dimensions: String,
    ingredients: [String],
    usageInstructions: String,
    // Multi-language specifications
    usageInstructionsTranslations: {
      en: String,
      fr: String,
      ar: String
    }
  },
  // SEO and discoverability
  tags: [String],
  // Product status management
  status: {
    type: String,
    enum: ['active', 'inactive', 'out-of-stock', 'draft'],
    default: 'active'
  },
  // Analytics and performance tracking
  views: {
    type: Number,
    default: 0
  },
  salesCount: {
    type: Number,
    default: 0
  },
  // Reviews and ratings
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Compound indexes for better query performance
productSchema.index({ cooperative: 1, status: 1 });
productSchema.index({ category: 1, status: 1 });
productSchema.index({ 'rating.average': -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

/**
 * Virtual for checking if product is in stock
 * Better than storing redundant data
 */
productSchema.virtual('inStock').get(function() {
  return this.stock > 0;
});

/**
 * Middleware to generate SKU if not provided
 * Automated inventory management
 */
productSchema.pre('save', function(next) {
  if (!this.sku) {
    this.sku = `PROD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);