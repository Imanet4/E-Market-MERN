const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * User schema supporting multiple roles: buyer, seller(cooperative), admin
 * Separate schemas for different user types to maintain data integrity
 */
const userSchema = mongoose.Schema({
  // Common fields for all user types
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username cannot exceed 30 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Security: don't return password in queries by default
  },
  role: {
    type: String,
    enum: ['buyer', 'seller', 'admin'],
    default: 'buyer'
  },
  profile: {
    firstName: String,
    lastName: String,
    phone: String,
    avatar: String
  },
  // Cooperative reference for sellers
  cooperative: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cooperative'
  },
  // Address for buyers
  address: {
    street: String,
    city: String,
    country: String,
    postalCode: String
  },
  preferences: {
    language: {
      type: String,
      enum: ['en', 'fr', 'ar'],
      default: 'en'
    },
    currency: {
      type: String,
      default: 'MAD'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true // Automatic createdAt and updatedAt
});

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ cooperative: 1 });

/**
 * Password hashing middleware - security best practice
 * Hash password before saving if it's modified
 */
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/**
 * Instance method to check password - separation of concerns
 */
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);