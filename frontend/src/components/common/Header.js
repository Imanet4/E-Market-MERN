import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const Header = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Simple SVG Icons
  const CartIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
  );

  const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );

  const LanguageIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  );

  // Get user display name (first name or username)
  const getUserDisplayName = () => {
    if (user?.profile?.firstName) {
      return user.profile.firstName;
    }
    return user?.username || 'User';
  };

  // Get user role badge for header
  const getUserRoleBadge = () => {
    if (!user) return null;

    const roleConfig = {
      buyer: { bg: 'primary', text: 'Buyer' },
      seller: { bg: 'success', text: 'Seller' },
      admin: { bg: 'danger', text: 'Admin' }
    };

    const config = roleConfig[user.role] || { bg: 'secondary', text: user.role };
    
    return (
      <Badge 
        bg={config.bg} 
        className="ms-2 d-none d-sm-inline-block"
        style={{ fontSize: '0.6rem' }}
      >
        {config.text}
      </Badge>
    );
  };

  return (
    <Navbar 
      expand="lg" 
      fixed="top" 
      className={scrolled ? 'navbar-transparent' : 'navbar-solid shadow-sm'}
      style={{ 
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.98)',
        backdropFilter: scrolled ? 'blur(10px)' : 'blur(15px)'
      }}
    >
      <Container>
        {/* Logo/Brand - No hover effects */}
        <Navbar.Brand className="brand-link">
          <div className="fw-bold fs-4" style={{ color: 'var(--royal)' }}>
            AtlasMarket
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Navigation Links */}
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link className="elegant-link mx-2">Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/products">
              <Nav.Link className="elegant-link mx-2">Products</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cooperatives">
              <Nav.Link className="elegant-link mx-2">Cooperatives</Nav.Link>
            </LinkContainer>
            <Nav.Link className="elegant-link mx-2 fw-bold" style={{ color: 'var(--gold)' }}>
              Souvenir Boxes
            </Nav.Link>
          </Nav>

          {/* Right-side Navigation */}
          <Nav className="align-items-center">
            {/* Language Switcher */}
            <NavDropdown 
              title={<LanguageIcon />} 
              id="language-dropdown" 
              className="me-3 elegant-link"
              align="end"
            >
              <NavDropdown.Item>English</NavDropdown.Item>
              <NavDropdown.Item>Français</NavDropdown.Item>
              <NavDropdown.Item>العربية</NavDropdown.Item>
            </NavDropdown>

            {/* Shopping Cart */}
            <LinkContainer to="/cart">
              <Nav.Link className="elegant-link position-relative me-3">
                <CartIcon />
                {cartCount > 0 && (
                  <Badge 
                    bg="primary" 
                    className="position-absolute top-0 start-100 translate-middle"
                    style={{ 
                      backgroundColor: 'var(--primary)',
                      fontSize: '0.6rem',
                      padding: '2px 4px'
                    }}
                  >
                    {cartCount}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>

            {/* User Authentication */}
            {user ? (
              <NavDropdown 
                title={
                  <div className="d-flex align-items-center">
                    <UserIcon />
                    <span className="ms-2 d-none d-md-inline">
                      {getUserDisplayName()}
                      {getUserRoleBadge()}
                    </span>
                  </div>
                }
                id="user-dropdown"
                align="end"
                className="elegant-link"
              >
                {/* User Info in Dropdown Header */}
                <div className="px-3 py-2 border-bottom">
                  <div className="fw-semibold">{getUserDisplayName()}</div>
                  <div className="d-flex align-items-center gap-2">
                    <small className="text-muted">@{user.username}</small>
                    {getUserRoleBadge()}
                  </div>
                  {user.role === 'seller' && user.cooperative && (
                    <div className="mt-1">
                      <Badge bg="warning" text="dark" style={{ fontSize: '0.6rem' }}>
                        🏺 {user.cooperative.name}
                      </Badge>
                    </div>
                  )}
                </div>

                <LinkContainer to="/profile">
                  <NavDropdown.Item className="d-flex align-items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    My Profile
                  </NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/orders">
                  <NavDropdown.Item className="d-flex align-items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-2">
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    My Orders
                  </NavDropdown.Item>
                </LinkContainer>
                
                {user.role === 'seller' && (
                  <LinkContainer to="/dashboard">
                    <NavDropdown.Item className="d-flex align-items-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                      Seller Dashboard
                    </NavDropdown.Item>
                  </LinkContainer>
                )}
                
                {user.role === 'admin' && (
                  <LinkContainer to="/admin">
                    <NavDropdown.Item className="d-flex align-items-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-2">
                        <path d="M12 15l-5.5-5.5L8 8l4 4 8-8 1.5 1.5L12 15z"></path>
                        <path d="M22 12A10 10 0 1 1 12 2"></path>
                      </svg>
                      Admin Panel
                    </NavDropdown.Item>
                  </LinkContainer>
                )}
                
                <NavDropdown.Divider />
                <NavDropdown.Item 
                  onClick={handleLogout}
                  className="d-flex align-items-center text-danger"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div className="d-flex gap-2">
                <LinkContainer to="/login">
                  <Nav.Link className="elegant-link">Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link className="elegant-link">Register</Nav.Link>
                </LinkContainer>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;