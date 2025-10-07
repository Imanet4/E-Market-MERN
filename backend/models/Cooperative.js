const mongoose = require('mongoose');

/**
 * Cooperative schema for vendor management
 * Each cooperative can have multiple sellers and products
 */
const cooperativeSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Cooperative name is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  // Multi-language support for internationalization
  descriptionTranslations: {
    en: String,
    fr: String,
    ar: String
  },
  contact: {
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    phone: String,
    address: {
      street: String,
      city: String,
      region: String,
      country: {
        type: String,
        default: 'Morocco'
      },
      postalCode: String
    }
  },
  // Cooperative details for authenticity
  foundationYear: Number,
  numberOfArtisans: Number,
  certifications: [String],
  // Media
  logo: String,
  bannerImages: [String],
  // Social proof
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
  },
  // Business metrics for admin dashboard
  totalSales: {
    type: Number,
    default: 0
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // Categories this cooperative specializes in
  categories: [{
    type: String,
    enum: ['edible-goods', 'cosmetics', 'clothing', 'accessories', 'souvenir-boxes']
  }]
}, {
  timestamps: true
});

cooperativeSchema.index({ name: 'text', description: 'text' });
cooperativeSchema.index({ isVerified: 1 });
cooperativeSchema.index({ categories: 1 });

module.exports = mongoose.model('Cooperative', cooperativeSchema);