const mongoose = require('mongoose');

/**
 * Database connection setup with error handling and monitoring
 * Using mongoose for MongoDB ODM for better schema validation and middleware support
 */
const connectDatabase = async () => {
  try {
    // Remove deprecated options for newer Mongoose versions
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    // Handle connection events for better monitoring
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('📵 MongoDB disconnected');
    });

    mongoose.connection.on('connected', () => {
      console.log('✅ MongoDB reconnected');
    });

  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDatabase;