import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { cooperativesAPI } from '../../services/cooperatives';
import { getPublicCooperatives } from '../../utils/mockData';

const Cooperatives = () => {
  const [cooperatives, setCooperatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [usingMockData, setUsingMockData] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    fetchCooperatives();
  }, []);

  const fetchCooperatives = async () => {
    try {
      setLoading(true);
      
      // Try real API first
      try {
        const response = await cooperativesAPI.getAllCooperatives();
        if (response.data && response.data.data) {
          setCooperatives(response.data.data);
          setUsingMockData(false);
        } else {
          throw new Error('No data from API');
        }
      } catch (apiError) {
        console.warn('API not available, using mock data:', apiError);
        const mockCooperatives = getPublicCooperatives();
        setCooperatives(mockCooperatives);
        setUsingMockData(true);
        setError('Connected to demo mode with sample cooperative data');
        setTimeout(() => setError(''), 3000);
      }

    } catch (err) {
      setError('Failed to load cooperatives');
      console.error('Cooperatives error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRegionColor = (region) => {
    const colors = {
      'Souss-Massa': 'var(--primary)',
      'Marrakech-Safi': 'var(--royal)',
      'Fes-Meknes': 'var(--gold)',
      'Drâa-Tafilalet': 'var(--earth)'
    };
    return colors[region] || 'var(--primary)';
  };

  if (loading) {
    return (
      <Container className="py-5" style={{ marginTop: '80px' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Discovering cooperatives...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5 cooperatives-page" style={{ marginTop: '80px', minHeight: '100vh' }}>
      {/* Header */}
      <Row className="mb-5 text-center">
        <Col>
          <h1 className="fw-bold mb-3 display-5">Our Cooperatives</h1>
          <p className="text-muted lead mx-auto" style={{ maxWidth: '600px' }}>
            Meet the talented artisans and cooperatives behind our authentic Moroccan products. 
            Each circle represents a community dedicated to preserving traditional crafts.
          </p>
        </Col>
      </Row>

      {/* Alerts */}
      {error && (
        <Alert variant={usingMockData ? 'warning' : 'info'} dismissible onClose={() => setError('')} className="mb-5">
          {error}
        </Alert>
      )}

      {/* Circular Cooperatives Grid */}
      <Row className="justify-content-center cooperatives-grid">
        {cooperatives.map((cooperative, index) => (
          <Col 
            key={cooperative._id} 
            xs={6} sm={4} md={3} lg={2} 
            className="mb-5 cooperative-col"
          >
            <div 
              className="cooperative-circle-container"
              onMouseEnter={() => setHoveredCard(cooperative._id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Main Circle */}
              <div 
                className="cooperative-circle"
                style={{
                  background: `linear-gradient(135deg, ${getRegionColor(cooperative.contact.address.region)} 0%, var(--royal) 100%)`,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="cooperative-initial">
                  {cooperative.name.charAt(0)}
                </div>
                
                {/* Hover Overlay */}
                <div className={`cooperative-hover-content ${hoveredCard === cooperative._id ? 'visible' : ''}`}>
                  <div className="hover-content-inner">
                    <h6 className="fw-bold mb-2">{cooperative.name}</h6>
                    <p className="small mb-2">
                      {cooperative.contact.address.city}, {cooperative.contact.address.region}
                    </p>
                    <div className="specialties mb-3">
                      {(cooperative.specialties || []).slice(0, 2).map(specialty => (
                        <Badge 
                          key={specialty}
                          bg="light" 
                          text="dark"
                          className="me-1 mb-1 small"
                        >
                          {specialty.split('-').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                        </Badge>
                      ))}
                    </div>
                    <div className="hover-actions">
                      <Link 
                        to={`/cooperatives/${cooperative._id}`}
                        className="btn btn-outline-light btn-sm me-2"
                      >
                        Learn More
                      </Link>
                      <Link 
                        to={`/products?cooperative=${cooperative._id}`}
                        className="btn btn-light btn-sm"
                      >
                        Shop
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cooperative Name (always visible) */}
              <div className="cooperative-name mt-3">
                <h6 className="fw-semibold mb-1 text-center">{cooperative.name}</h6>
                <small className="text-muted text-center d-block">
                  {cooperative.contact.address.city}
                </small>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Call to Action */}
      <Row className="mt-5 text-center">
        <Col>
          <div className="border-top pt-5 mx-auto" style={{ maxWidth: '600px' }}>
            <h5 className="fw-bold mb-3">Support Authentic Moroccan Crafts</h5>
            <p className="text-muted mb-4">
              Every purchase supports local artisans and helps preserve traditional Moroccan crafts 
              for future generations.
            </p>
            <Link to="/products" className="btn btn-primary btn-lg">
              Explore All Products
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Cooperatives;