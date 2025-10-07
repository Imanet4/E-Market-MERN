const mongoose = require('mongoose');

/**
 * Category schema for product categorization
 * Supports multi-language category names and descriptions
 * Organized hierarchy for better product discovery
 */
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true,
    maxlength: [50, 'Category name cannot exceed 50 characters']
  },
  // Multi-language support for internationalization
  nameTranslations: {
    en: String,
    fr: String,
    ar: String
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  descriptionTranslations: {
    en: String,
    fr: String,
    ar: String
  },
  // Category hierarchy support
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  // Category slug for SEO-friendly URLs
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  // Category image for visual representation
  image: String,
  // Display order for frontend organization
  displayOrder: {
    type: Number,
    default: 0
  },
  // Category-specific properties
  properties: {
    // Common specifications for products in this category
    specifications: [{
      name: String,
      nameTranslations: {
        en: String,
        fr: String,
        ar: String
      },
      type: {
        type: String,
        enum: ['text', 'number', 'boolean', 'options']
      },
      options: [String], // For enum type
      required: {
        type: Boolean,
        default: false
      }
    }]
  },
  // Category status
  isActive: {
    type: Boolean,
    default: true
  },
  // SEO metadata
  metaTitle: String,
  metaDescription: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for subcategories
categorySchema.virtual('subcategories', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parent'
});

// Virtual for products count
categorySchema.virtual('productCount', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'category',
  count: true
});

// Index for better query performance
categorySchema.index({ slug: 1 });
categorySchema.index({ parent: 1 });
categorySchema.index({ displayOrder: 1, isActive: 1 });
categorySchema.index({ isActive: 1 });

/**
 * Pre-save middleware to generate slug
 * Creates URL-friendly slug from category name
 */
categorySchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
  next();
});

/**
 * Static method to get category tree
 * Returns hierarchical category structure
 */
categorySchema.statics.getCategoryTree = async function() {
  const categories = await this.find({ isActive: true })
    .populate('subcategories')
    .sort({ displayOrder: 1, name: 1 });

  const buildTree = (categories, parentId = null) => {
    return categories
      .filter(cat => 
        (parentId === null && !cat.parent) || 
        (cat.parent && cat.parent.toString() === parentId)
      )
      .map(cat => ({
        ...cat.toObject(),
        subcategories: buildTree(categories, cat._id.toString())
      }));
  };

  return buildTree(categories);
};

/**
 * Instance method to get breadcrumb
 * Useful for navigation in frontend
 */
categorySchema.methods.getBreadcrumb = async function() {
  const breadcrumb = [];
  let currentCategory = this;
  
  while (currentCategory) {
    breadcrumb.unshift({
      _id: currentCategory._id,
      name: currentCategory.name,
      slug: currentCategory.slug
    });
    
    if (currentCategory.parent) {
      currentCategory = await this.constructor.findById(currentCategory.parent);
    } else {
      currentCategory = null;
    }
  }
  
  return breadcrumb;
};

module.exports = mongoose.model('Category', categorySchema);