import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/common/Layout';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import { CartProvider } from './contexts/CartContext';
import Cart from './pages/Cart/Cart';
import Profile from './pages/Profile/Profile';
import Orders from './pages/Orders/Orders';
import Cooperatives from './pages/Cooperatives/Cooperatives';
import ProductDetails from './pages/Products/ProductDetails';
import CooperativeDetails from './pages/Cooperatives/CooperativeDetails';

function App() {
  return (
   <CartProvider> 
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cooperatives" element={<Cooperatives />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cooperatives/:id" element={<CooperativeDetails />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
   </CartProvider> 
  );
}

export default App;