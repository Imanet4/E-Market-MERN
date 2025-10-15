import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { mockSouvenirBoxes } from '../../utils/mockData';

const SouvenirTeaser = () => {
  // Use actual box data from mockData
  const boxes = mockSouvenirBoxes.slice(0, 4); // Show first 4 boxes

  // SVG Icons mapped to box categories
  const LuxuryIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3L21 9L12 21L3 9L12 3Z"></path>
    </svg>
  );

  const BeautyIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  );

  const ArtisanIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2C12 2 15 6 15 10C15 13 13 15 12 17C11 15 9 13 9 10C9 6 12 2 12 2Z"></path>
      <path d="M12 17V22"></path>
      <path d="M8 22H16"></path>
    </svg>
  );

  const GiftIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="20 12 20 22 4 22 4 12"></polyline>
      <rect x="2" y="7" width="20" height="5"></rect>
      <line x1="12" y1="22" x2="12" y2="7"></line>
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
    </svg>
  );

  const HandpickIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 6L9 17l-5-5"></path>
    </svg>
  );

  const CooperativeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );

  const PackageIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="20 12 20 22 4 22 4 12"></polyline>
      <rect x="2" y="7" width="20" height="5"></rect>
      <line x1="12" y1="22" x2="12" y2="7"></line>
    </svg>
  );

  const FairTradeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  );

  const CultureIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
    </svg>
  );

  const OccasionIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  );

  // Get icon based on box category
  const getBoxIcon = (category) => {
    switch (category) {
      case 'premium':
        return <LuxuryIcon />;
      case 'cosmetics':
        return <BeautyIcon />;
      case 'handicrafts':
        return <ArtisanIcon />;
      default:
        return <GiftIcon />;
    }
  };

  // Get icon color based on box category
  const getIconColor = (category) => {
    switch (category) {
      case 'premium':
        return { backgroundColor: 'rgba(251, 191, 36, 0.2)', color: 'var(--gold)' };
      case 'cosmetics':
        return { backgroundColor: 'rgba(59, 130, 246, 0.2)', color: 'var(--royal)' };
      case 'handicrafts':
        return { backgroundColor: 'rgba(237, 116, 24, 0.2)', color: 'var(--primary)' };
      default:
        return { backgroundColor: 'rgba(251, 191, 36, 0.2)', color: 'var(--gold)' };
    }
  };

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
                Perfect for Tourists & Gifts
              </span>
              
              <h2 className="display-5 fw-bold mb-4">
                Moroccan Souvenir Boxes
              </h2>
              
              <p className="lead mb-4" style={{ opacity: 0.9, lineHeight: '1.8' }}>
                Take a piece of Morocco home with our carefully curated souvenir boxes. 
                Each box contains authentic products and traditional crafts that tell the 
                story of Moroccan heritage and artisan craftsmanship.
              </p>
              
              <div className="mb-4">
                <h5 className="mb-3" style={{ color: 'var(--gold)' }}>What Makes Our Boxes Special:</h5>
                <Row>
                  <Col sm={6}>
                    <ul className="list-unstyled">
                      <li className="mb-3 d-flex align-items-center">
                        <span className="me-2" style={{ color: 'var(--gold)' }}>
                          <HandpickIcon />
                        </span>
                        Handpicked authentic products
                      </li>
                      <li className="mb-3 d-flex align-items-center">
                        <span className="me-2" style={{ color: 'var(--gold)' }}>
                          <CooperativeIcon />
                        </span>
                        Supporting local cooperatives
                      </li>
                      <li className="mb-3 d-flex align-items-center">
                        <span className="me-2" style={{ color: 'var(--gold)' }}>
                          <PackageIcon />
                        </span>
                        Ready-to-gift elegant packaging
                      </li>
                    </ul>
                  </Col>
                  <Col sm={6}>
                    <ul className="list-unstyled">
                      <li className="mb-3 d-flex align-items-center">
                        <span className="me-2" style={{ color: 'var(--gold)' }}>
                          <FairTradeIcon />
                        </span>
                        Fair trade & ethical sourcing
                      </li>
                      <li className="mb-3 d-flex align-items-center">
                        <span className="me-2" style={{ color: 'var(--gold)' }}>
                          <CultureIcon />
                        </span>
                        Cultural heritage preservation
                      </li>
                      <li className="mb-3 d-flex align-items-center">
                        <span className="me-2" style={{ color: 'var(--gold)' }}>
                          <OccasionIcon />
                        </span>
                        Perfect for any occasion
                      </li>
                    </ul>
                  </Col>
                </Row>
              </div>
              
              <div className="d-flex justify-content-center">
                <Link to="/souvenir-boxes">
                  <Button 
                    className="btn-minimal btn-minimal-primary px-4 py-3"
                  >
                    Explore All Boxes →
                  </Button>
                </Link>
              </div>
            </div>
          </Col>
          
          <Col lg={6}>
            <Row className="g-3">
              {/* Dynamic Souvenir Box Cards */}
              {boxes.map((box) => {
                const iconStyle = getIconColor(box.category);
                return (
                  <Col md={6} key={box._id}>
                    <Card 
                      className="text-center border-0 shadow card-elegant h-100"
                      style={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        minHeight: '220px'
                      }}
                    >
                      <Card.Body className="p-4 d-flex flex-column">
                        <div 
                          className="icon-elegant mx-auto mb-3"
                          style={iconStyle}
                        >
                          {getBoxIcon(box.category)}
                        </div>
                        <h6 className="fw-bold mb-2">{box.name}</h6>
                        <small className="opacity-75 mb-3 flex-grow-1" style={{ lineHeight: '1.4', color: '#faf0e6'}}>
                          {box.description.length > 80 
                            ? `${box.description.substring(0, 80)}...` 
                            : box.description
                          }
                        </small>
                        <div className="mt-auto">
                          <div className="fw-bold mb-2" style={{ color: 'var(--gold)' }}>
                            ${box.price}
                          </div>
                          <small className="text-muted">
                            {box.contents.length} curated items
                          </small>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SouvenirTeaser;