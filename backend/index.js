const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import database connection
const connectDatabase = require('./config/database');

// Import middleware
const { i18nMiddleware, detectLanguage, addLanguageContext } = require('./middleware/i18n');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const cooperativeRoutes = require('./routes/cooperatives');

// Initialize express app
const app = express();

// Security middleware configuration
 
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
 
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5
});

app.use('/api/', generalLimiter);
app.use('/api/auth/', authLimiter);

//  Body parsing and cookie middleware

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Internationalization middleware
 
app.use(i18nMiddleware);
app.use(detectLanguage);
app.use(addLanguageContext);

// Static files
 
app.use('/uploads', express.static('uploads'));

//  Routes
 
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cooperatives', cooperativeRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    language: req.getLocale()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    requestedPath: req.originalUrl
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// Server configuration
const PORT = process.env.PORT || 5000;


// Database config and server startup

const startServer = async () => {
  try {
    //Connecting to the database
    await connectDatabase();

    // Starting the server

    const server = app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
      console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
      console.log(`📚 API Documentation ready for frontend integration`);
    });

    // Graceful shutdown handling
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully');
      server.close(() => {
        console.log('Process terminated');
      });
    });

  } catch (error) {
    console.error('❌Failed to start server:', error);
    process.exit(1);
  }
};

// Start the application
startServer();