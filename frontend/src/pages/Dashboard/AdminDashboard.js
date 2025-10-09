import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Badge, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { getPlatformStats, getRecentActivity, getUserDistribution } from '../../utils/mockData';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [platformStats, setPlatformStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [userDistribution, setUserDistribution] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPlatformData();
  }, []);

  const fetchPlatformData = async () => {
    try {
      setLoading(true);

      // Using our mock data functions
      const stats = getPlatformStats();
      const activity = getRecentActivity();
      const distribution = getUserDistribution();
      
      
      setPlatformStats(stats);

      setRecentActivity(activity);

      setUserDistribution(distribution);

    } catch (err) {
      setError('Failed to load platform data');
      console.error('Admin dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, subtitle, color, icon, trend }) => (
    <Card className="h-100 border-0 shadow-sm dashboard-card">
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h3 className="fw-bold mb-2" style={{ color }}>{value}</h3>
            <h6 className="text-muted mb-1">{title}</h6>
            <small className="text-muted">{subtitle}</small>
            {trend && (
              <Badge bg={trend.value > 0 ? 'success' : 'danger'} className="mt-1">
                {trend.value > 0 ? '↑' : '↓'} {Math.abs(trend.value)}% {trend.period}
              </Badge>
            )}
          </div>
          <div 
            className="bg-light rounded-circle d-flex align-items-center justify-content-center" 
            style={{ width: '50px', height: '50px', backgroundColor: `${color}15` }}
          >
            {icon}
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  const getPriorityVariant = (priority) => {
    const variants = {
      info: 'primary',
      success: 'success',
      warning: 'warning',
      danger: 'danger'
    };
    return variants[priority] || 'secondary';
  };

  const getActivityIcon = (type) => {
    const icons = {
      user_registration: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="8.5" cy="7" r="4"></circle>
          <line x1="20" y1="8" x2="20" y2="14"></line>
          <line x1="23" y1="11" x2="17" y2="11"></line>
        </svg>
      ),
      order_completed: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
      ),
      product_approval: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
          <line x1="7" y1="7" x2="7.01" y2="7"></line>
        </svg>
      ),
      system_alert: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      )
    };
    return icons[type] || icons.system_alert;
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Loading platform data...</p>
      </div>
    );
  }

  if (!platformStats) {
    return (
      <Alert variant="warning">
        <Alert.Heading>No Data Available</Alert.Heading>
        <p>Unable to load platform statistics. Please try again later.</p>
      </Alert>
    );
  }

  return (
    <div>
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <div className="mb-4">
        <h2 className="fw-bold mb-2">Platform Overview</h2>
        <p className="text-muted mb-0">
          Welcome back, {user?.profile?.firstName}. Here's your platform summary.
        </p>
      </div>

      {/* Platform Stats Cards */}
      <Row className="g-4 mb-5">
        <Col md={4}>
          <StatCard 
            title="Total Users" 
            value={platformStats.totalUsers.toLocaleString()} 
            subtitle="Registered accounts"
            color="#3b82f6"
            trend={{ value: 12, period: 'this month' }}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            }
          />
        </Col>
        <Col md={4}>
          <StatCard 
            title="Active Sellers" 
            value={platformStats.totalSellers} 
            subtitle="Cooperatives & vendors"
            color="#ed7418"
            trend={{ value: 5, period: 'this month' }}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ed7418" strokeWidth="2">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
              </svg>
            }
          />
        </Col>
        <Col md={4}>
          <StatCard 
            title="Platform Revenue" 
            value={`$${platformStats.totalRevenue.toLocaleString()}`} 
            subtitle="Lifetime total"
            color="#10b981"
            trend={{ value: 18, period: 'this month' }}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            }
          />
        </Col>
      </Row>

      <Row className="g-4 mb-5">
        <Col md={8}>
          {/* Recent Activity */}
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white border-bottom py-4">
              <h5 className="fw-bold mb-0">Recent Platform Activity</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <Table hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="border-0 ps-4 py-3">Activity</th>
                    <th className="border-0 py-3">User</th>
                    <th className="border-0 py-3">Time</th>
                    <th className="border-0 pe-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivity.map((activity) => (
                    <tr key={activity.id}>
                      <td className="ps-4">
                        <div className="d-flex align-items-center">
                          <div className="me-3 text-muted">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div>
                            <div className="fw-semibold">{activity.description}</div>
                            <small className="text-muted text-capitalize">
                              {activity.type.replace('_', ' ')}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td>{activity.user}</td>
                      <td>
                        <small className="text-muted">{activity.timestamp}</small>
                      </td>
                      <td className="pe-4">
                        <Badge bg={getPriorityVariant(activity.priority)} className="text-capitalize">
                          {activity.priority}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          {/* User Distribution */}
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white border-bottom py-4">
              <h5 className="fw-bold mb-0">User Distribution</h5>
            </Card.Header>
            <Card.Body>
              {userDistribution.map((dist, index) => (
                <div key={dist.role} className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="text-capitalize fw-semibold">{dist.role}</span>
                    <span className="text-muted">{dist.count} ({dist.percentage}%)</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div 
                      className="progress-bar" 
                      style={{ 
                        width: `${dist.percentage}%`,
                        backgroundColor: dist.color
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Stats Row */}
      <Row className="g-4">
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="h4 fw-bold text-primary">{platformStats.totalProducts}</div>
              <small className="text-muted">Total Products</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="h4 fw-bold text-success">{platformStats.totalOrders}</div>
              <small className="text-muted">Total Orders</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="h4 fw-bold text-warning">{platformStats.activeUsers}</div>
              <small className="text-muted">Active Users (30d)</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="h4 fw-bold text-info">94%</div>
              <small className="text-muted">Platform Uptime</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;