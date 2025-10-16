## **E-MARKET-MERN - E-Commerce Marketplace Platform**


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

## 📁 Project Structure

| Backend (`/backend`) | Frontend (`/frontend`) |
|---------------------|-----------------------|
| `config/` - Database configuration | `public/` - Static assets |
| `controllers/` - Business logic | `src/components/` - React components |
| `locales/` - Internationalization | `src/contexts/` - State management |
| `middleware/` - Auth & validation | `src/pages/` - Page components |
| `models/` - MongoDB schemas | `src/services/` - API services |
| `routes/` - API endpoints | `src/utils/` - Utility functions |
| `uploads/` - File storage | `App.js` - Main component |
| `utils/` - Helper functions | `package.json` - Dependencies |
| `.env` - Environment variables | |
| `index.js` - Entry point | |



**🚀 Installation & Setup**
*Prerequisites*
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Backend Setup

1. Navigate to backend directory:
 - cd backend
2. Install dependencies :
 - npm install
3. Environment Configuration:
 - Create a .env file in the backend directory with:
   * PORT=5000
   * MONGODB_URI=mongodb://localhost:27017/emarket
   * JWT_SECRET=your_jwt_secret_key
   * NODE_ENV=development
4. Start the backend server:
 - npm start
 - *Backend will run on http://localhost:5000*
