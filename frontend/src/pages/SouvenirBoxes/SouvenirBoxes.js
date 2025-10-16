import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { mockSouvenirBoxes, souvenirBoxCategories } from '../../utils/mockData';

const SouvenirBoxes = () => {
  const [boxes, setBoxes] = useState([]);
  const [filteredBoxes, setFilteredBoxes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      setBoxes(mockSouvenirBoxes);
      setFilteredBoxes(mockSouvenirBoxes);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredBoxes(boxes);
    } else {
      setFilteredBoxes(boxes.filter(box => box.category === selectedCategory));
    }
  }, [selectedCategory, boxes]);

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

  const getCategoryColor = (category) => {
    switch (category) {
      case 'premium':
        return { bg: 'rgba(251, 191, 36, 0.1)', text: 'var(--gold)', border: 'rgba(251, 191, 36, 0.3)' };
      case 'cosmetics':
        return { bg: 'rgba(59, 130, 246, 0.1)', text: 'var(--royal)', border: 'rgba(59, 130, 246, 0.3)' };
      case 'handicrafts':
        return { bg: 'rgba(237, 116, 24, 0.1)', text: 'var(--primary)', border: 'rgba(237, 116, 24, 0.3)' };
      default:
        return { bg: 'rgba(108, 117, 125, 0.1)', text: '#6c757d', border: 'rgba(108, 117, 125, 0.3)' };
    }
  };

  if (loading) {
    return (
      <Container className="py-5" style={{ marginTop: '80px' }}>
        <div className="text-center">
          <Spinner animation="border" style={{ color: 'var(--primary)' }} />
          <p className="mt-2 text-muted">Discovering our souvenir boxes...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5" style={{ marginTop: '80px' }}>
      {/* Header Section */}
      <Row className="mb-5">
        <Col className="text-center">
          <h1 className="display-4 fw-bold mb-3" style={{ color: 'var(--earth-dark)' }}>
            Moroccan Souvenir Boxes
          </h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
            Carefully curated collections that bring the essence of Morocco to your home. 
            Each box tells a story of traditional craftsmanship and cultural heritage.
          </p>
        </Col>
      </Row>

      {/* Category Filters */}
      <Row className="mb-5">
        <Col className="text-center">
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {souvenirBoxCategories.map(category => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? 'primary' : 'outline-primary'}
                size="sm"
                onClick={() => setSelectedCategory(category.value)}
                style={{
                  backgroundColor: selectedCategory === category.value ? 'var(--primary)' : 'transparent',
                  borderColor: selectedCategory === category.value ? 'var(--primary)' : 'var(--primary)',
                  color: selectedCategory === category.value ? 'white' : 'var(--primary)'
                }}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </Col>
      </Row>

      {/* Demo Mode Indicator */}
      <Alert variant="info" className="mb-4">
        <strong>Demo Mode</strong> - Showing sample souvenir boxes for demonstration.
      </Alert>

      {/* Boxes Grid */}
      <Row>
        {filteredBoxes.map(box => {
          const categoryStyle = getCategoryColor(box.category);
          
          return (
            <Col lg={4} md={6} key={box._id} className="mb-4">
              <Card 
                className="h-100 border-0 shadow-sm"
                style={{ 
                  transition: 'all 0.3s ease',
                  border: `2px solid ${categoryStyle.border}`
                }}
              >
                <Card.Body className="p-4 d-flex flex-column">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <Badge 
                      style={{ 
                        backgroundColor: categoryStyle.bg,
                        color: categoryStyle.text,
                        border: `1px solid ${categoryStyle.border}`
                      }}
                      className="text-capitalize"
                    >
                      {box.category.replace('-', ' ')}
                    </Badge>
                  </div>

                  {/* Box Name & Rating */}
                  <div className="mb-3">
                    <h4 className="fw-bold mb-2" style={{ color: 'var(--earth-dark)' }}>
                      {box.name}
                    </h4>
                    {box.rating && (
                      <div className="d-flex align-items-center">
                        {renderStars(box.rating.average)}
                        <small className="text-muted ms-2">
                          ({box.rating.count} reviews)
                        </small>
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mb-3">
                    <h3 className="fw-bold" style={{ color: 'var(--primary)' }}>
                      ${box.price}
                    </h3>
                    <small className="text-muted">
                      {box.stock > 0 ? `${box.stock} available` : 'Out of Stock'}
                    </small>
                  </div>

                  {/* Description */}
                  <p className="text-muted mb-4 flex-grow-1">
                    {box.description}
                  </p>

                  {/* Contents */}
                  <div className="mb-4">
                    <h6 className="fw-semibold mb-3" style={{ color: 'var(--earth-dark)' }}>
                      📦 What's Inside:
                    </h6>
                    <div className="row">
                      {box.contents.slice(0, 4).map((item, index) => (
                        <div key={index} className="col-6 mb-2">
                          <small className="text-muted d-block">
                            • {item.name}
                          </small>
                        </div>
                      ))}
                      {box.contents.length > 4 && (
                        <div className="col-12">
                          <small className="text-muted">
                            + {box.contents.length - 4} more items
                          </small>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="mb-4">
                    <h6 className="fw-semibold mb-2" style={{ color: 'var(--earth-dark)' }}>
                      📏 Box Details:
                    </h6>
                    <div className="row">
                      {Object.entries(box.specifications).map(([key, value]) => (
                        <div key={key} className="col-6 mb-1">
                          <small className="text-muted">
                            <strong className="text-capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </strong>{' '}
                            {Array.isArray(value) ? value.join(', ') : value}
                          </small>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-auto">
                    <Button 
                      variant="primary" 
                      className="w-100 mb-2"
                      disabled={box.stock === 0}
                      style={{ 
                        backgroundColor: box.stock === 0 ? '#6c757d' : 'var(--primary)',
                        borderColor: box.stock === 0 ? '#6c757d' : 'var(--primary)'
                      }}
                    >
                      {box.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </Button>
                    <Button 
                      variant="outline-primary" 
                      className="w-100"
                    >
                      View Full Details
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Empty State */}
      {filteredBoxes.length === 0 && (
        <Card className="border-0 shadow-sm text-center py-5">
          <Card.Body>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted mb-3">
              <polyline points="20 12 20 22 4 22 4 12"></polyline>
              <rect x="2" y="7" width="20" height="5"></rect>
              <line x1="12" y1="22" x2="12" y2="7"></line>
              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
            </svg>
            <h5 className="text-muted">No boxes found</h5>
            <p className="text-muted mb-0">
              Try selecting a different category or check back later for new collections.
            </p>
          </Card.Body>
        </Card>
      )}

      {/* Call to Action */}
      <Row className="mt-5">
        <Col className="text-center">
          <Card className="border-0" style={{ backgroundColor: 'var(--light-cream)' }}>
            <Card.Body className="p-5">
              <h4 className="fw-bold mb-3" style={{ color: 'var(--earth-dark)' }}>
                Can't Find What You're Looking For?
              </h4>
              <p className="text-muted mb-4">
                Our souvenir boxes are regularly updated with new collections. 
                Sign up for our newsletter to be the first to know about new arrivals.
              </p>
              <Link to="/products">
                <Button variant="outline-primary" size="lg">
                  Explore Individual Products
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SouvenirBoxes;