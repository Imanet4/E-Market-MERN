import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { mockSouvenirBoxes, souvenirBoxCategories } from '../../utils/mockData';

const SouvenirBoxes = () => {
  const [boxes, setBoxes] = useState([]);
  const [filteredBoxes, setFilteredBoxes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // SVG Icons
  const PackageIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 12 20 22 4 22 4 12"></polyline>
      <rect x="2" y="7" width="20" height="5"></rect>
      <line x1="12" y1="22" x2="12" y2="7"></line>
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
    </svg>
  );

  const WeightIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  );

  const DimensionsIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="3" y1="9" x2="21" y2="9"></line>
      <line x1="9" y1="21" x2="9" y2="9"></line>
    </svg>
  );

  const ItemsIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
  );

  const ContentsIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  );

  const DetailsIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  );

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
                {/* Box Image */}
                <div className="position-relative">
                  <Card.Img 
                    variant="top"
                    src={box.images && box.images[0] ? box.images[0] : '/images/products/default-product.jpg'}
                    style={{ 
                      height: '250px', 
                      objectFit: 'contain',
                      backgroundColor: '#f8f9fa'
                    }}
                    onError={(e) => {
                      e.target.src = '/images/products/default-product.jpg';
                    }}
                  />
                  {box.stock === 0 && (
                    <div className="position-absolute top-0 start-0 m-2">
                      <Badge bg="danger">Out of Stock</Badge>
                    </div>
                  )}
                </div>

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
                    <div className="d-flex align-items-center mb-3">
                      <ContentsIcon />
                      <h6 className="fw-semibold mb-0 ms-2" style={{ color: 'var(--earth-dark)' }}>
                        Box Contents
                      </h6>
                    </div>
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
                    <div className="d-flex align-items-center mb-2">
                      <DetailsIcon />
                      <h6 className="fw-semibold mb-0 ms-2" style={{ color: 'var(--earth-dark)' }}>
                        Box Specifications
                      </h6>
                    </div>
                    <div className="row">
                      {box.specifications.weight && (
                        <div className="col-6 mb-2">
                          <small className="text-muted d-flex align-items-center">
                            <WeightIcon className="me-1"/>
                            <strong className="me-1" style={{ marginLeft:'8px'}}>Weight:</strong> {box.specifications.weight}
                          </small>
                        </div>
                      )}
                      {box.specifications.dimensions && (
                        <div className="col-6 mb-2">
                          <small className="text-muted d-flex align-items-center">
                            <DimensionsIcon className="me-1" />
                            <strong className="me-1" style={{ marginLeft:'8px'}}>Size:</strong> {box.specifications.dimensions}
                          </small>
                        </div>
                      )}
                      {box.specifications.includes && (
                        <div className="col-12 mb-2">
                          <small className="text-muted d-flex align-items-center">
                            <ItemsIcon className="me-1" />
                            <strong className="me-1" style={{ marginLeft:'8px'}}>Includes:</strong> {box.specifications.includes}
                          </small>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-auto">
                    <Button 
                      variant="primary" 
                      className="w-100"
                      disabled={box.stock === 0}
                      style={{ 
                        backgroundColor: box.stock === 0 ? '#6c757d' : 'var(--primary)',
                        borderColor: box.stock === 0 ? '#6c757d' : 'var(--primary)',
                        transition: 'all 0.3s ease',
                        transform: 'translateY(0)'
                      }}
                      onMouseEnter={(e) => {
                        if (!box.stock === 0) {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 4px 12px rgba(237, 116, 24, 0.3)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <PackageIcon style={{ marginRight: '8px' }} />
                      {box.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
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
            <PackageIcon style={{ width: '64px', height: '64px', color: '#6b7280' }} className="mb-3" />
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