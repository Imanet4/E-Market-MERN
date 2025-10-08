import React from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId) => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      removeFromCart(productId);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Container className="py-5" style={{ marginTop: '80px' }}>
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <div className="mb-4">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </div>
            <h2 className="mb-3" style={{ color: 'var(--earth-dark)' }}>Your Cart is Empty</h2>
            <p className="text-muted mb-4">
              Discover amazing Moroccan products and add them to your cart.
            </p>
            <Link to="/products">
              <Button 
                style={{ 
                  backgroundColor: 'var(--primary)',
                  borderColor: 'var(--primary)'
                }}
                size="lg"
              >
                Start Shopping
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5" style={{ marginTop: '80px' }}>
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fw-bold" style={{ color: 'var(--earth-dark)' }}>Shopping Cart</h1>
            <Button 
              variant="outline-danger" 
              size="sm"
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your entire cart?')) {
                  clearCart();
                }
              }}
            >
              Clear Cart
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-0">
              <Table hover responsive className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="border-0 ps-4 py-3">Product</th>
                    <th className="border-0 py-3">Price</th>
                    <th className="border-0 py-3">Quantity</th>
                    <th className="border-0 py-3">Total</th>
                    <th className="border-0 pe-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id}>
                      <td className="ps-4">
                        <div className="d-flex align-items-center">
                          <div 
                            className="rounded me-3"
                            style={{
                              width: '60px',
                              height: '60px',
                              background: 'linear-gradient(135deg, #ed7418 0%, #3b82f6 100%)'
                            }}
                          ></div>
                          <div>
                            <div className="fw-semibold">{item.name}</div>
                            <small className="text-muted">
                              By {item.cooperative}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="fw-semibold" style={{ color: 'var(--primary)' }}>
                          ${item.price}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </Button>
                          <span className="mx-3 fw-semibold">{item.quantity}</span>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                          >
                            +
                          </Button>
                        </div>
                        {item.quantity >= item.stock && (
                          <small className="text-warning d-block mt-1">
                            Maximum stock reached
                          </small>
                        )}
                      </td>
                      <td>
                        <div className="fw-bold" style={{ color: 'var(--primary)' }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </td>
                      <td className="pe-4">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleRemoveItem(item._id)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="border-0 shadow-sm sticky-top" style={{ top: '100px' }}>
            <Card.Header className="bg-white border-bottom-0 py-4">
              <h5 className="fw-bold mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Shipping</span>
                <span>
                  {getCartTotal() > 500 ? (
                    <Badge bg="success">FREE</Badge>
                  ) : (
                    '$50.00'
                  )}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Tax</span>
                <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>
                <strong className="h5" style={{ color: 'var(--primary)' }}>
                  $
                  {(
                    getCartTotal() + 
                    (getCartTotal() > 500 ? 0 : 50) + 
                    (getCartTotal() * 0.1)
                  ).toFixed(2)}
                </strong>
              </div>

              {getCartTotal() < 500 && (
                <Alert variant="info" className="small">
                  Add ${(500 - getCartTotal()).toFixed(2)} more for free shipping!
                </Alert>
              )}

              <div className="d-grid gap-2">
                <Button 
                  size="lg"
                  style={{ 
                    backgroundColor: 'var(--primary)',
                    borderColor: 'var(--primary)'
                  }}
                >
                  Proceed to Checkout
                </Button>
                <Link to="/products">
                  <Button variant="outline-primary" className="w-100">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;