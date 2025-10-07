import React, { useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import DashboardOverview from './DashboardOverview';
import ProductManagement from './ProductManagement';
import OrderManagement from './OrderManagement';
import InventoryManagement from './InventoryManagement';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'products':
        return <ProductManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'inventory':
        return <InventoryManagement />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <Container fluid className="py-4" style={{ marginTop: '80px', minHeight: '100vh' }}>
      <Row>
        {/* Sidebar Navigation */}
        <Col lg={3} className="mb-4">
          <div className="bg-white border rounded p-4 sticky-top" style={{ top: '100px' }}>
            <div className="text-center mb-4">
              <div className="bg-light rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" 
                   style={{ width: '80px', height: '80px' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h6 className="fw-bold mb-1">{user?.cooperative?.name || 'Your Cooperative'}</h6>
              <small className="text-muted">Seller Dashboard</small>
            </div>

            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link 
                  active={activeTab === 'overview'}
                  onClick={() => setActiveTab('overview')}
                  className="d-flex align-items-center py-3 border-bottom"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-3">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  Overview
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  active={activeTab === 'products'}
                  onClick={() => setActiveTab('products')}
                  className="d-flex align-items-center py-3 border-bottom"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-3">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                  </svg>
                  Products
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  active={activeTab === 'orders'}
                  onClick={() => setActiveTab('orders')}
                  className="d-flex align-items-center py-3 border-bottom"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-3">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  Orders
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  active={activeTab === 'inventory'}
                  onClick={() => setActiveTab('inventory')}
                  className="d-flex align-items-center py-3"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-3">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  Inventory
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </Col>

        {/* Main Content */}
        <Col lg={9}>
          {renderContent()}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;