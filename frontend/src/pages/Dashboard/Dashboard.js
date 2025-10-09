import React, { useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import DashboardOverview from './DashboardOverview';
import ProductManagement from './ProductManagement';
import OrderManagement from './OrderManagement';
import InventoryManagement from './InventoryManagement';
import AdminDashboard from './AdminDashboard';
import UserManagement from './UserManagement';
import PlatformAnalytics from './PlatformAnalytics';
import SystemSettings from './SystemSettings';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Role-based navigation configuration
  const getNavItems = () => {
    const commonItems = [
      {
        key: 'overview',
        label: 'Overview',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-3">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        )
      }
    ];

    if (user?.role === 'seller') {
      return [
        ...commonItems,
        {
          key: 'products',
          label: 'Products',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-3">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
              <line x1="7" y1="7" x2="7.01" y2="7"></line>
            </svg>
          )
        },
        {
          key: 'orders',
          label: 'Orders',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-3">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          )
        },
        {
          key: 'inventory',
          label: 'Inventory',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-3">
              <path d="M3 6h18"></path>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          )
        }
      ];
    }

    if (user?.role === 'admin') {
      return [
        {
          key: 'overview',
          label: 'Admin Overview',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-3">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          )
        },
        {
          key: 'users',
          label: 'User Management',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-3">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          )
        },
        {
          key: 'analytics',
          label: 'Platform Analytics',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-3">
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
          )
        },
        {
          key: 'settings',
          label: 'System Settings',
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-3">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          )
        }
      ];
    }

    return commonItems;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return user?.role === 'admin' ? <AdminDashboard /> : <DashboardOverview />;
      case 'products':
        return <ProductManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'inventory':
        return <InventoryManagement />;
      case 'users':
        return <UserManagement />;
      case 'analytics':
        return <PlatformAnalytics />;
      case 'settings':
        return <SystemSettings />;
      default:
        return user?.role === 'admin' ? <AdminDashboard /> : <DashboardOverview />;
    }
  };

  const navItems = getNavItems();

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
              <h6 className="fw-bold mb-1">
                {user?.role === 'admin' 
                  ? 'Platform Admin' 
                  : user?.cooperative?.name || 'Your Cooperative'
                }
              </h6>
              <small className="text-muted text-capitalize">
                {user?.role === 'admin' ? 'Administrator' : `${user?.role} Dashboard`}
              </small>
            </div>

            <Nav variant="pills" className="flex-column">
              {navItems.map((item) => (
                <Nav.Item key={item.key}>
                  <Nav.Link 
                    active={activeTab === item.key}
                    onClick={() => setActiveTab(item.key)}
                    className="d-flex align-items-center py-3 border-bottom"
                  >
                    {item.icon}
                    {item.label}
                  </Nav.Link>
                </Nav.Item>
              ))}
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