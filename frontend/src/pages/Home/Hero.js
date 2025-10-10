import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section 
      className="py-5 text-white position-relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, var(--royal) 0%, var(--primary) 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        marginTop: '76px' // Account for fixed header
      }}
    >
      {/* Sophisticated Pattern Overlay */}
      <div 
        className="position-absolute w-100 h-100"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />
      
      <Container className="position-relative">
        <Row className="align-items-center">
          <Col lg={6} className="fade-in-up">
            <div className="mb-4">
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
                Authentic Moroccan Heritage
              </span>
            </div>
            
            <h1 className="display-3 fw-bold mb-4 lh-sm">
              Discover the Soul of{' '}
              <span 
                style={{ 
                  color: 'var(--gold)',
                  background: 'linear-gradient(135deg, var(--gold), var(--primary))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Morocco
              </span>
            </h1>
            
            <p className="lead mb-4 fs-5" style={{ opacity: 0.9, lineHeight: '1.8' }}>
              Handcrafted treasures from local cooperatives. Experience the rich culture 
              and traditional craftsmanship through our curated collection of authentic 
              Moroccan products.
            </p>
            
            {/* In the Hero component, replace the buttons section with:*/}
              <div className="d-flex flex-wrap gap-3 mt-5">
                <Link to="/products" className="text-decoration-none">
                  <Button 
                    className="btn-minimal btn-minimal-primary px-4 py-3"
                  >
                    Explore Collection
                  </Button>
                </Link>
                
                <Link to="/cooperatives" className="text-decoration-none">
                  <Button 
                    className="btn-minimal px-4 py-3"
                  >
                    Meet Artisans
                  </Button>
                </Link>
              </div>
            
            {/* Stats */}
            <Row className="mt-5 pt-4 border-top border-white border-opacity-25">
              <Col xs={4} className="text-center">
                <div className="h4 fw-bold mb-1" style={{ color: 'var(--gold)' }}>50+</div>
                <small className="opacity-75">Cooperatives</small>
              </Col>
              <Col xs={4} className="text-center">
                <div className="h4 fw-bold mb-1" style={{ color: 'var(--gold)' }}>500+</div>
                <small className="opacity-75">Products</small>
              </Col>
              <Col xs={4} className="text-center">
                <div className="h4 fw-bold mb-1" style={{ color: 'var(--gold)' }}>100%</div>
                <small className="opacity-75">Authentic</small>
              </Col>
            </Row>
          </Col>
          
          <Col lg={6} className="text-center fade-in-up">
            <div 
              className="position-relative mx-auto"
              style={{ maxWidth: '500px' }}
            >
              {/* Sophisticated Geometric Design */}
              <div 
                className="rounded-4 mx-auto position-relative"
                style={{
                  width: '400px',
                  height: '400px',
                  background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div 
                  className="rounded-3 position-relative"
                  style={{
                    width: '300px',
                    height: '300px',
                    background: 'linear-gradient(135deg, rgba(237, 116, 24, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
                    border: '1px dashed rgba(251, 191, 36, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div className="icon-elegant" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;