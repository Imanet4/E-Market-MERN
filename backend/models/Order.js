const mongoose = require('mongoose');

/**
 * Order schema with comprehensive order management
 * Supports multi-vendor orders with proper status tracking
 */
const orderSchema = mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Support for orders with products from multiple cooperatives
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    cooperative: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cooperative',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  // Order totals and pricing
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  shippingFee: {
    type: Number,
    default: 0,
    min: 0
  },
  taxAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  // Shipping information
  shippingAddress: {
    firstName: String,
    lastName: String,
    street: String,
    city: String,
    country: String,
    postalCode: String,
    phone: String
  },
  // Payment information (placeholder integration)
  payment: {
    method: {
      type: String,
      enum: ['card', 'paypal', 'bank-transfer', 'cash-on-delivery'],
      default: 'card'
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    paidAt: Date
  },
  // Order status tracking
  status: {
    type: String,
    enum: [
      'pending',
      'confirmed',
      'processing',
      'shipped',
      'delivered',
      'cancelled',
      'refunded'
    ],
    default: 'pending'
  },
  // Timeline for order tracking
  timeline: {
    placed: { type: Date, default: Date.now },
    confirmed: Date,
    processed: Date,
    shipped: Date,
    delivered: Date
  },
  // Notes and communication
  notes: {
    customer: String,
    internal: String
  }
}, {
  timestamps: true
});

// Indexes for efficient querying
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ 'items.cooperative': 1 });

/**
 * Pre-save middleware to generate order number
 * Ensures unique order identifiers
 */
orderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    this.orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  }
  next();
});

/**
 * Instance method to calculate totals
 * Business logic encapsulation
 */
orderSchema.methods.calculateTotals = function() {
  this.subtotal = this.items.reduce((sum, item) => sum + item.subtotal, 0);
  this.total = this.subtotal + this.shippingFee + this.taxAmount;
};

module.exports = mongoose.model('Order', orderSchema);