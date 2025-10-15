import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Alert, Spinner, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { cooperativesAPI } from '../../services/cooperatives';
import { getPublicCooperatives, mockProducts } from '../../utils/mockData';

const CooperativeDetails = () => {
  const { id } = useParams();
  const [cooperative, setCooperative] = useState(null);
  const [cooperativeProducts, setCooperativeProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    fetchCooperative();
  }, [id]);

  const fetchCooperative = async () => {
    try {
      setLoading(true);
      
      // Try real API first
      try {
        const response = await cooperativesAPI.getCooperative(id);
        if (response.data && response.data.data) {
          setCooperative(response.data.data);
          setUsingMockData(false);
        } else {
          throw new Error('No cooperative data from API');
        }
      } catch (apiError) {
        console.warn('API not available, using mock data:', apiError);
        // Fallback to mock data
        const cooperatives = getPublicCooperatives();
        const mockCooperative = cooperatives.find(c => c._id === id);
        if (mockCooperative) {
          setCooperative(mockCooperative);
          setUsingMockData(true);
        } else {
          throw new Error('Cooperative not found');
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cooperative) {
      // Filter products by this cooperative
      const products = mockProducts.filter(product => 
        product.cooperative && product.cooperative._id === cooperative._id
      );
      setCooperativeProducts(products);
    }
  }, [cooperative]);

  if (loading) {
    return (
      <Container className="py-5" style={{ marginTop: '80px' }}>
        <div className="text-center">
          <Spinner animation="border" style={{ color: 'var(--primary)' }} />
          <p className="mt-2 text-muted">Discovering cooperative story...</p>
        </div>
      </Container>
    );
  }

  if (error || !cooperative) {
    return (
      <Container className="py-5" style={{ marginTop: '80px' }}>
        <Alert variant="danger">
          <h5>Cooperative Not Found</h5>
          <p>{error || 'The cooperative you are looking for does not exist.'}</p>
          <Link to="/cooperatives" className="btn btn-primary">
            Back to Cooperatives
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
          <strong>Demo Mode</strong> - Showing sample cooperative data for demonstration.
        </Alert>
      )}

      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" style={{ color: 'var(--primary)' }}>Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/cooperatives" style={{ color: 'var(--primary)' }}>Cooperatives</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {cooperative.name}
          </li>
        </ol>
      </nav>

      {/* Hero Section with Logo */}
      <Row className="mb-5 text-center">
        <Col>
          <div className="mb-4">
            <img 
              src={cooperative.logo || '/images/cooperatives/default-coop-logo.png'}
              alt={`${cooperative.name} logo`}
              style={{
                width: '220px', // 30% larger than cooperatives page
                height: '220px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '4px solid var(--cream)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
              }}
              onError={(e) => {
                e.target.src = '/images/cooperatives/default-coop-logo.png';
              }}
            />
          </div>
          <h1 className="display-5 fw-bold mb-3" style={{ color: 'var(--earth-dark)' }}>
            {cooperative.name}
          </h1>
          <p className="lead text-muted mb-4">
            {cooperative.contact.address.city}, {cooperative.contact.address.region}
          </p>
          
          {/* Stats Badges */}
          <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
            <Badge 
              bg="light" 
              text="dark" 
              className="px-3 py-2 fs-6"
              style={{ backgroundColor: 'var(--light-cream)' }}
            >
              👥 {cooperative.stats.memberCount} Artisans
            </Badge>
            <Badge 
              bg="light" 
              text="dark" 
              className="px-3 py-2 fs-6"
              style={{ backgroundColor: 'var(--light-cream)' }}
            >
              ⭐ {cooperative.stats.rating} Rating
            </Badge>
            <Badge 
              bg="light" 
              text="dark" 
              className="px-3 py-2 fs-6"
              style={{ backgroundColor: 'var(--light-cream)' }}
            >
              🛍️ {cooperative.stats.productCount} Products
            </Badge>
          </div>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Story & Mission Section */}
        <Col lg={8}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <div className="mb-4">
                <h3 className="fw-bold mb-3" style={{ color: 'var(--earth-dark)' }}>
                  Our Story & Mission
                </h3>
                <div 
                  className="text-muted lead"
                  style={{ lineHeight: '1.8', fontSize: '1.1rem' }}
                >
                  {cooperative.story}
                </div>
              </div>

              {/* Empowerment Focus */}
              <Card 
                className="border-0 mt-4"
                style={{ backgroundColor: 'var(--light-cream)' }}
              >
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-3" style={{ color: 'var(--primary)' }}>
                    🌟 Empowering Our Community
                  </h5>
                  <Row>
                    <Col md={6}>
                      <div className="mb-3">
                        <h6 className="fw-semibold">Fair Wages</h6>
                        <p className="text-muted small mb-0">
                          Every artisan receives fair compensation for their craftsmanship, 
                          ensuring sustainable livelihoods for their families.
                        </p>
                      </div>
                      <div className="mb-3">
                        <h6 className="fw-semibold">Skill Preservation</h6>
                        <p className="text-muted small mb-0">
                          We preserve ancient techniques passed down through generations, 
                          keeping cultural heritage alive.
                        </p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <h6 className="fw-semibold">Women Empowerment</h6>
                        <p className="text-muted small mb-0">
                          {cooperative.stats.memberCount}% of our members are women gaining 
                          economic independence through traditional crafts.
                        </p>
                      </div>
                      <div className="mb-3">
                        <h6 className="fw-semibold">Community Development</h6>
                        <p className="text-muted small mb-0">
                          Profits support local schools, healthcare, and infrastructure 
                          in underserved areas.
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        </Col>

        {/* Contact & Info Sidebar */}
        <Col lg={4}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header style={{ backgroundColor: 'var(--cream)', border: 'none' }}>
              <h5 className="mb-0 fw-bold">Contact Information</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <strong>📍 Location</strong>
                <p className="text-muted mb-0">
                  {cooperative.contact.address.city}, {cooperative.contact.address.region}
                </p>
              </div>
              <div className="mb-3">
                <strong>📧 Email</strong>
                <p className="text-muted mb-0">{cooperative.contact.email}</p>
              </div>
              <div className="mb-3">
                <strong>📞 Phone</strong>
                <p className="text-muted mb-0">{cooperative.contact.phone}</p>
              </div>
              
              {/* Social Media Links */}
              {cooperative.social && (
                <div className="mt-4">
                  <strong>Follow Their Journey</strong>
                  <div className="d-flex gap-2 mt-2">
                    {cooperative.social.website && (
                      <Button 
                        size="sm" 
                        variant="outline-primary"
                        as="a"
                        href={cooperative.social.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Website
                      </Button>
                    )}
                    {cooperative.social.instagram && (
                      <Button 
                        size="sm" 
                        variant="outline-danger"
                        as="a"
                        href={`https://instagram.com/${cooperative.social.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Instagram
                      </Button>
                    )}
                    {cooperative.social.facebook && (
                      <Button 
                        size="sm" 
                        variant="outline-primary"
                        as="a"
                        href={`https://facebook.com/${cooperative.social.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Facebook
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Certifications */}
          {cooperative.certifications && cooperative.certifications.length > 0 && (
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header style={{ backgroundColor: 'var(--cream)', border: 'none' }}>
                <h5 className="mb-0 fw-bold">Certifications</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex flex-wrap gap-2">
                  {cooperative.certifications.map((cert, index) => (
                    <Badge 
                      key={index}
                      bg="light" 
                      text="dark"
                      className="text-capitalize"
                    >
                      {cert.replace('-', ' ')}
                    </Badge>
                  ))}
                </div>
              </Card.Body>
            </Card>
          )}

          {/* Shipping & Returns */}
          <Card className="border-0 shadow-sm">
            <Card.Header style={{ backgroundColor: 'var(--cream)', border: 'none' }}>
              <h5 className="mb-0 fw-bold">Shipping & Returns</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <h6 className="fw-semibold">Shipping</h6>
                <p className="text-muted small mb-0">
                  Free shipping on orders over $50. Standard delivery 3-5 business days.
                </p>
              </div>
              <div>
                <h6 className="fw-semibold">Returns</h6>
                <p className="text-muted small mb-0">
                  Handcrafted items may have slight variations. Contact us within 
                  14 days for returns due to damage or defects.
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Cooperative Products */}
      {cooperativeProducts.length > 0 && (
        <Row className="mt-5">
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Header style={{ backgroundColor: 'var(--cream)', border: 'none' }}>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 fw-bold">Products from {cooperative.name}</h5>
                  <Link 
                    to={`/products?cooperative=${cooperative._id}`}
                    className="btn btn-sm btn-outline-primary"
                  >
                    View All Products
                  </Link>
                </div>
              </Card.Header>
              <Card.Body>
                <Row>
                  {cooperativeProducts.slice(0, 3).map(product => (
                    <Col md={4} key={product._id} className="mb-3">
                      <Card className="border-0 h-100">
                        <Card.Img 
                          variant="top"
                          src={product.images[0] || '/images/products/default-product.jpg'}
                          style={{ 
                            height: '150px', 
                            objectFit: 'contain',
                            backgroundColor: '#f8f9fa',
                            padding: '10px'
                          }}
                        />
                        <Card.Body>
                          <Card.Title className="h6 mb-1">
                            <Link 
                              to={`/products/${product._id}`}
                              style={{ color: 'var(--earth-dark)', textDecoration: 'none' }}
                            >
                              {product.name}
                            </Link>
                          </Card.Title>
                          <Card.Text className="text-primary fw-bold mb-0">
                            ${product.price}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CooperativeDetails;