import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-earth text-white mt-5" style={{ backgroundColor: 'var(--earth-dark)' }}>
      <Container className="py-5">
        <Row>
          <Col md={4}>
            <h5 className="fw-bold mb-3">Moroccan Cooperatives</h5>
            <p className="text-light">
              Connecting you with authentic Moroccan artisanal products directly from local cooperatives.
            </p>
            <div className="d-flex gap-3">
              <span className="fs-5">📱</span>
              <span className="fs-5">📘</span>
              <span className="fs-5">📷</span>
            </div>
          </Col>
          
          <Col md={2}>
            <h6 className="fw-bold mb-3">Shop</h6>
            <ul className="list-unstyled">
              <li><a href="#!" className="text-light text-decoration-none">Edible Goods</a></li>
              <li><a href="#!" className="text-light text-decoration-none">Cosmetics</a></li>
              <li><a href="#!" className="text-light text-decoration-none">Clothing</a></li>
              <li><a href="#!" className="text-light text-decoration-none">Accessories</a></li>
            </ul>
          </Col>
          
          <Col md={2}>
            <h6 className="fw-bold mb-3">Support</h6>
            <ul className="list-unstyled">
              <li><a href="#!" className="text-light text-decoration-none">Contact Us</a></li>
              <li><a href="#!" className="text-light text-decoration-none">Shipping Info</a></li>
              <li><a href="#!" className="text-light text-decoration-none">Returns</a></li>
              <li><a href="#!" className="text-light text-decoration-none">FAQ</a></li>
            </ul>
          </Col>
          
          <Col md={2}>
            <h6 className="fw-bold mb-3">Cooperatives</h6>
            <ul className="list-unstyled">
              <li><a href="#!" className="text-light text-decoration-none">Join Us</a></li>
              <li><a href="#!" className="text-light text-decoration-none">Benefits</a></li>
              <li><a href="#!" className="text-light text-decoration-none">Resources</a></li>
            </ul>
          </Col>
          
          <Col md={2}>
            <h6 className="fw-bold mb-3">Legal</h6>
            <ul className="list-unstyled">
              <li><a href="#!" className="text-light text-decoration-none">Privacy Policy</a></li>
              <li><a href="#!" className="text-light text-decoration-none">Terms of Service</a></li>
            </ul>
          </Col>
        </Row>
        
        <hr className="my-4" />
        
        <Row className="align-items-center">
          <Col md={6}>
            <p className="mb-0 text-light">
              &copy; 2024 Moroccan Cooperatives Marketplace. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <small className="text-light">
              Crafted with ❤️ in Morocco
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;