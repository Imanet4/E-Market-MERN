**E-MARKET-MERN - E-Commerce Marketplace Platform**


![MERN Stack](https://img.shields.io/badge/MERN-Full%2520Stack-green)
![Node.js](https://img.shields.io/badge/Node.js-18%252B-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)


A full-stack e-commerce marketplace platform built with the MERN stack, featuring multi-role access for Admin, Sellers, and Buyers with comprehensive dashboard management capabilities.


**🚀 Features**

*👑 Admin Features :*

- Dashboard Overview - Comprehensive site analytics and performance metrics
- User Management - Manage all users, roles, and permissions
- Site Management - Control platform settings and configurations
- Order Monitoring - Track all transactions across the platform
- Category Management - Organize and manage product categories

*🛍️ Seller Features:*

- Seller Dashboard - Sales analytics and performance insights
- Inventory Management - Add, edit, and manage product listings
- Product Creation - Rich product creation with image uploads
- Order Management - Process and track customer orders
- Sales Analytics - View sales reports and revenue metrics

*👤 Buyer Features:*

- Product Browsing - Search and filter products by categories
- Shopping Cart - Add items and manage quantities
- Order System - Place orders and track order status
- Order History - View past purchases and order details
- Profile Management - Update personal information and preferences

**🛠️ Tech Stack **

*Frontend:*
 - React.js
 - Context API for state management
 - CSS3 with modern styling & bootstrap
 - Axios for API calls

*Backend:*
 - Node.js
 - Express.js
 - MongoDB with Mongoose
 - JWT Authentication
 - File upload handling

**📁 Project Structure**

E-MARKET-MERN/
├── backend/
│   ├── config/          # Database configuration and environment setup
│   ├── controllers/     # Business logic for handling requests
│   ├── locales/         # Internationalization files
│   ├── middleware/      # Authentication and validation middleware
│   ├── models/          # MongoDB schema definitions
│   ├── routes/          # API endpoint definitions
│   ├── uploads/         # File storage for product images
│   ├── utils/           # Utility functions and helpers
│   ├── .env             # Environment variables
│   └── index.js         # Backend entry point
└── frontend/
    ├── public/          # Static assets
    ├── src/
    │   ├── components/  # Reusable React components
    │   ├── contexts/    # React context for state management
    │   ├── pages/       # Main page components for different views
    │   ├── services/    # API service functions
    │   ├── utils/       # Frontend utility functions
    │   └── App.js       # Main React component
    └── package.json

