import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SouvenirTeaser = () => {
  // SVG Icons
  const GiftIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="20 12 20 22 4 22 4 12"></polyline>
      <rect x="2" y="7" width="20" height="5"></rect>
      <line x1="12" y1="22" x2="12" y2="7"></line>
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
    </svg>
  );

  const StarIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  );

  const PotteryIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2C12 2 15 6 15 10C15 13 13 15 12 17C11 15 9 13 9 10C9 6 12 2 12 2Z"></path>
      <path d="M12 17V22"></path>
      <path d="M8 22H16"></path>
    </svg>
  );

  const DiamondIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3L21 9L12 21L3 9L12 3Z"></path>
      <path d="M12 3L21 9L12 21"></path>
      <path d="M12 3L3 9L12 21"></path>
    </svg>
  );

  return (
    <section 
      className="py-5 text-white"
      style={{ 
        background: 'linear-gradient(135deg, var(--earth-dark) 0%, var(--primary-dark) 100%)'
      }}
    >
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-4 mb-lg-0">
            <div className="pe-lg-4">
              <span 
                className="badge mb-3 px-3 py-2 rounded-pill"
                style={{ 
                  backgroundColor: 'rgba(251, 191, 36, 0.2)',
                  color: 'var(--gold)',
                  fontSize: '0.8rem',
                  fontWeight: '500',
                  backdropFilter: 'blur(10px)'
                }}
              >
                Perfect for Tourists
              </span>
              
              <h2 className="display-5 fw-bold mb-4">
                Moroccan Souvenir Boxes
              </h2>
              
              <p className="lead mb-4" style={{ opacity: 0.9, lineHeight: '1.8' }}>
                Take a piece of Morocco home with our carefully curated souvenir boxes. 
                Each box contains a selection of authentic products, traditional crafts, 
                and Moroccan tile-inspired keepsakes.
              </p>
              
              <div className="mb-4">
                <h5 className="mb-3" style={{ color: 'var(--gold)' }}>What's Inside:</h5>
                <Row>
                  <Col sm={6}>
                    <ul className="list-unstyled">
                      <li className="mb-2 elegant-link d-inline-block">Moroccan tile coasters</li>
                      <li className="mb-2 elegant-link d-inline-block">Hand-painted ceramic mugs</li>
                      <li className="mb-2 elegant-link d-inline-block">Traditional charm bracelets</li>
                    </ul>
                  </Col>
                  <Col sm={6}>
                    <ul className="list-unstyled">
                      <li className="mb-2 elegant-link d-inline-block">Mini argan oil bottles</li>
                      <li className="mb-2 elegant-link d-inline-block">Authentic spice samples</li>
                      <li className="mb-2 elegant-link d-inline-block">Handcrafted decorative items</li>
                    </ul>
                  </Col>
                </Row>
              </div>
              
              <div className="d-flex flex-wrap gap-3">
                <Button 
                  className="btn-minimal btn-minimal-primary px-4 py-3"
                >
                  Explore Souvenir Boxes
                </Button>
                
                <Button 
                  className="btn-minimal px-4 py-3"
                >
                  Customize Your Box
                </Button>
              </div>
            </div>
          </Col>
          
          <Col lg={6}>
            <Row className="g-3">
              {/* Souvenir Box Preview Cards */}
              <Col md={6}>
                <Card 
                  className="text-center border-0 shadow card-elegant"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Card.Body className="p-4">
                    <div 
                      className="icon-elegant mx-auto mb-3"
                      style={{ 
                        backgroundColor: 'rgba(251, 191, 36, 0.2)',
                        color: 'var(--gold)'
                      }}
                    >
                      <GiftIcon />
                    </div>
                    <h6 className="fw-bold mb-2">Classic Box</h6>
                    <small className="opacity-75 d-block mb-3" style={{ lineHeight: '1.4' }}>
                      Perfect introduction to Moroccan crafts
                    </small>
                    <div className="fw-bold" style={{ color: 'var(--gold)' }}>
                      $49.99
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={6}>
                <Card 
                  className="text-center border-0 shadow card-elegant"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Card.Body className="p-4">
                    <div 
                      className="icon-elegant mx-auto mb-3"
                      style={{ 
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        color: 'var(--royal)'
                      }}
                    >
                      <StarIcon />
                    </div>
                    <h6 className="fw-bold mb-2">Premium Box</h6>
                    <small className="opacity-75 d-block mb-3" style={{ lineHeight: '1.4' }}>
                      Luxury items & exclusive products
                    </small>
                    <div className="fw-bold" style={{ color: 'var(--gold)' }}>
                      $99.99
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={6}>
                <Card 
                  className="text-center border-0 shadow card-elegant"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Card.Body className="p-4">
                    <div 
                      className="icon-elegant mx-auto mb-3"
                      style={{ 
                        backgroundColor: 'rgba(237, 116, 24, 0.2)',
                        color: 'var(--primary)'
                      }}
                    >
                      <PotteryIcon />
                    </div>
                    <h6 className="fw-bold mb-2">Artisan Box</h6>
                    <small className="opacity-75 d-block mb-3" style={{ lineHeight: '1.4' }}>
                      Traditional crafts & handmade items
                    </small>
                    <div className="fw-bold" style={{ color: 'var(--gold)' }}>
                      $79.99
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={6}>
                <Card 
                  className="text-center border-0 shadow card-elegant"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Card.Body className="p-4">
                    <div 
                      className="icon-elegant mx-auto mb-3"
                      style={{ 
                        backgroundColor: 'rgba(251, 191, 36, 0.2)',
                        color: 'var(--gold)'
                      }}
                    >
                      <DiamondIcon />
                    </div>
                    <h6 className="fw-bold mb-2">Custom Box</h6>
                    <small className="opacity-75 d-block mb-3" style={{ lineHeight: '1.4' }}>
                      Tailored to your preferences
                    </small>
                    <div className="fw-bold" style={{ color: 'var(--gold)' }}>
                      From $69.99
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SouvenirTeaser;