import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Badge, Toast } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { mockProducts } from '../../utils/mockData';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastProduct, setToastProduct] = useState(null);
  const { addToCart, cartCount, getCartItemCount } = useCart();

  useEffect(() => {
    // Use the first 4 products from shared mock data
    const featured = mockProducts.slice(0, 4);
    setProducts(featured);
    setLoading(false);
  }, []);

  const handleAddToCart = (product) => {
    if (product.stock === 0) return;
    
    addToCart(product);
    setToastProduct(product);
    setShowToast(true);
    
    // Auto hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-warning">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-warning">★</span>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-muted">★</span>);
    }
    
    return stars;
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" style={{ color: 'var(--primary)' }} />
      </Container>
    );
  }

  return (
    <section className="py-5 bg-light">
      <Container>
        <Row className="mb-5">
          <Col className="text-center">
            <h2 className="display-5 fw-bold mb-3" style={{ color: 'var(--earth-dark)' }}>
              Featured Artisanal Products
            </h2>
            <p className="lead text-muted">
              Handpicked treasures from Moroccan cooperatives
            </p>
          </Col>
        </Row>

        {/* Add to Cart Toast */}
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)}
          style={{
            position: 'fixed',
            top: '100px',
            right: '20px',
            zIndex: 1050,
            minWidth: '300px'
          }}
        >
          <Toast.Header>
            <strong className="me-auto">🎉 Added to Cart!</strong>
          </Toast.Header>
          <Toast.Body>
            {toastProduct && (
              <div className="d-flex align-items-center">
                <div 
                  className="rounded me-3"
                  style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #ed7418 0%, #3b82f6 100%)'
                  }}
                ></div>
                <div>
                  <strong>{toastProduct.name}</strong>
                  <div className="text-muted">${toastProduct.price}</div>
                </div>
              </div>
            )}
            <div className="mt-2">
              <small>Cart now has {cartCount} items</small>
            </div>
          </Toast.Body>
        </Toast>

        <Row>
          {products.map((product) => {
            const cartQuantity = getCartItemCount(product._id);
            
            return (
              <Col lg={3} md={6} key={product._id} className="mb-4">
                <Card 
                  className="h-100 border-0 shadow-sm product-card"
                  style={{ transition: 'all 0.3s ease' }}
                >
                  <div className="position-relative overflow-hidden">
                    <Card.Img 
                      variant="top"
                      src={product.images[0] || `/images/products/default-product.jpg`}
                      style={{ 
                        height: '200px', 
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                      }}
                      className="card-img-hover"
                      onError={(e) => {
                        e.target.src = `/images/products/default-product.jpg`;
                      }}
                    />
                    <div 
                      className="position-absolute top-0 end-0 m-2"
                      style={{ 
                        backgroundColor: 'var(--gold)',
                        color: 'var(--earth-dark)',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '0.7rem',
                        fontWeight: 'bold'
                      }}
                    >
                      Featured
                    </div>
                  </div>
                  
                  <Card.Body className="d-flex flex-column">
                    <div className="mb-2">
                      <small 
                        className="text-muted"
                        style={{ color: 'var(--royal)' }}
                      >
                        {product.cooperative?.name}
                      </small>
                    </div>
                    
                    <Card.Title 
                      className="h6 mb-2"
                      style={{ color: 'var(--earth-dark)' }}
                    >
                      {product.name}
                    </Card.Title>
                    
                    <Card.Text 
                      className="flex-grow-1 small text-muted"
                    >
                      {product.description.length > 80 
                        ? `${product.description.substring(0, 80)}...` 
                        : product.description
                      }
                    </Card.Text>

                    {product.rating && (
                      <div className="mb-3">
                        <div className="d-flex align-items-center">
                          {renderStars(product.rating.average)}
                          <small className="text-muted ms-1">
                            ({product.rating.count})
                          </small>
                        </div>
                      </div>
                    )}
                    
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <span 
                        className="h5 mb-0 fw-bold"
                        style={{ color: 'var(--primary)' }}
                      >
                        ${product.price}
                      </span>
                      <div className="d-flex align-items-center gap-2">
                        {cartQuantity > 0 && (
                          <small className="text-muted">
                            In cart: {cartQuantity}
                          </small>
                        )}
                        <Button 
                          size="sm"
                          style={{ 
                            backgroundColor: product.stock === 0 ? '#6c757d' : 'var(--primary)',
                            borderColor: product.stock === 0 ? '#6c757d' : 'var(--primary)'
                          }}
                          disabled={product.stock === 0}
                          onClick={() => handleAddToCart(product)}
                        >
                          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>

        <Row className="mt-4">
          <Col className="text-center">
            <Link to="/products">
              <Button 
                variant="outline-primary"
                size="lg"
                style={{ 
                  color: 'var(--primary)',
                  borderColor: 'var(--primary)'
                }}
              >
                View All Products →
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FeaturedProducts;