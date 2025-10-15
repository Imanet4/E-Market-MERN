import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert, Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { productsAPI } from '../../services/products';
import { mockProducts, getPublicCooperatives } from '../../utils/mockData';
import { useCart } from '../../contexts/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [cooperative, setCooperative] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [usingMockData, setUsingMockData] = useState(false);
  
  const { addToCart, getCartItemCount } = useCart();
  const cartQuantity = product ? getCartItemCount(product._id) : 0;

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      
      // Try real API first
      try {
        const response = await productsAPI.getById(id);
        if (response.data && response.data.data) {
          setProduct(response.data.data);
          setUsingMockData(false);
        } else {
          throw new Error('No product data from API');
        }
      } catch (apiError) {
        console.warn('API not available, using mock data:', apiError);
        // Fallback to mock data
        const mockProduct = mockProducts.find(p => p._id === id);
        if (mockProduct) {
          setProduct(mockProduct);
          setUsingMockData(true);
        } else {
          throw new Error('Product not found');
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (product && product.cooperative) {
      const cooperatives = getPublicCooperatives();
      const productCooperative = cooperatives.find(c => c._id === product.cooperative._id);
      setCooperative(productCooperative);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product && product.stock > 0) {
      addToCart(product);
    }
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
      <Container className="py-5" style={{ marginTop: '80px' }}>
        <div className="text-center">
          <Spinner animation="border" style={{ color: 'var(--primary)' }} />
          <p className="mt-2 text-muted">Loading product details...</p>
        </div>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container className="py-5" style={{ marginTop: '80px' }}>
        <Alert variant="danger">
          <h5>Product Not Found</h5>
          <p>{error || 'The product you are looking for does not exist.'}</p>
          <Link to="/products" className="btn btn-primary">
            Back to Products
          </Link>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5" style={{ marginTop: '80px' }}>
      {/* Demo Mode Indicator */}
      {usingMockData && (
        <Alert variant="info" className="mb-4">
          <strong>Demo Mode</strong> - Showing sample product data for demonstration.
        </Alert>
      )}

      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" style={{ color: 'var(--primary)' }}>Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/products" style={{ color: 'var(--primary)' }}>Products</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <Row>
        {/* Product Images */}
        <Col lg={6} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4 text-center">
              <img 
                src={product.images && product.images[0] ? product.images[0] : '/images/products/default-product.jpg'}
                alt={product.name}
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '400px', 
                  objectFit: 'contain',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px'
                }}
                onError={(e) => {
                  e.target.src = '/images/products/default-product.jpg';
                }}
              />
            </Card.Body>
          </Card>
        </Col>

        {/* Product Details */}
        <Col lg={6}>
          <div className="mb-4">
            <Badge 
              bg="light" 
              text="dark" 
              className="text-capitalize mb-3"
            >
              {product.category.replace('-', ' ')}
            </Badge>
            
            <h1 className="display-6 fw-bold mb-3" style={{ color: 'var(--earth-dark)' }}>
              {product.name}
            </h1>

            {product.rating && (
              <div className="d-flex align-items-center mb-3">
                {renderStars(product.rating.average)}
                <span className="text-muted ms-2">
                  ({product.rating.count} reviews)
                </span>
              </div>
            )}

            <div className="mb-4">
              <h2 className="fw-bold" style={{ color: 'var(--primary)' }}>
                ${product.price}
              </h2>
              <p className={product.stock > 0 ? 'text-success' : 'text-danger'}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
              </p>
            </div>

            <p className="lead mb-4" style={{ lineHeight: '1.6' }}>
              {product.description}
            </p>

            {/* Cooperative Info */}
            {cooperative && (
              <Card className="border-0 mb-4" style={{ backgroundColor: 'var(--light-cream)' }}>
                <Card.Body className="p-3">
                  <div className="d-flex align-items-center">
                    <img 
                      src={cooperative.logo || '/images/cooperatives/default-coop-logo.png'}
                      alt={cooperative.name}
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        marginRight: '15px'
                      }}
                      onError={(e) => {
                        e.target.src = '/images/cooperatives/default-coop-logo.png';
                      }}
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-1 fw-bold">Made by {cooperative.name}</h6>
                      <p className="text-muted small mb-1">{cooperative.contact.address.city}, {cooperative.contact.address.region}</p>
                      <Link 
                        to={`/cooperatives/${cooperative._id}`}
                        className="small"
                        style={{ color: 'var(--primary)' }}
                      >
                        Learn more about this cooperative →
                      </Link>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            )}

            {/* Add to Cart Section */}
            <div className="d-flex gap-3 mb-4">
              <Button 
                size="lg"
                style={{ 
                  backgroundColor: product.stock === 0 ? '#6c757d' : 'var(--primary)',
                  borderColor: product.stock === 0 ? '#6c757d' : 'var(--primary)',
                  flex: 1
                }}
                disabled={product.stock === 0}
                onClick={handleAddToCart}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
              
              {cartQuantity > 0 && (
                <Badge bg="primary" className="align-self-center p-2">
                  {cartQuantity} in cart
                </Badge>
              )}
            </div>
          </div>
        </Col>
      </Row>

      {/* Product Specifications */}
      {product.specifications && (
        <Row className="mt-5">
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Header style={{ backgroundColor: 'var(--cream)', border: 'none' }}>
                <h5 className="mb-0 fw-bold">Product Specifications</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <Col md={6} key={key} className="mb-3">
                      <strong className="text-capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </strong>
                      <span className="text-muted ms-2">
                        {Array.isArray(value) ? value.join(', ') : value}
                      </span>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Shipping Policy */}
      <Row className="mt-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header style={{ backgroundColor: 'var(--cream)', border: 'none' }}>
              <h5 className="mb-0 fw-bold">Shipping Information</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h6 className="fw-bold mb-2">Domestic Shipping (Morocco)</h6>
                  <ul className="text-muted">
                    <li>Free shipping on orders over $50</li>
                    <li>Standard delivery: 3-5 business days</li>
                    <li>Express delivery: 1-2 business days ($15)</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h6 className="fw-bold mb-2">International Shipping</h6>
                  <ul className="text-muted">
                    <li>Standard delivery: 7-14 business days</li>
                    <li>Express delivery: 3-5 business days ($25)</li>
                    <li>Customs and import taxes may apply</li>
                  </ul>
                </Col>
              </Row>
              <div className="mt-3 p-3 rounded" style={{ backgroundColor: 'var(--light-cream)' }}>
                <small className="text-muted">
                  <strong>Note:</strong> All products are carefully packaged by our cooperatives to ensure safe delivery. 
                  Handcrafted items may have slight variations that make each piece unique.
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;