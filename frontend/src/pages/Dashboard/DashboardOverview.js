import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Badge } from 'react-bootstrap';

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    lowStockItems: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    // Mock data - replace with API calls
    setStats({
      totalProducts: 24,
      totalOrders: 156,
      totalRevenue: 12450,
      lowStockItems: 3
    });

    setRecentOrders([
      { id: 'ORD-001', customer: 'Ahmed Benali', amount: 249.99, status: 'pending', date: '2024-01-15' },
      { id: 'ORD-002', customer: 'Marie Dubois', amount: 149.50, status: 'shipped', date: '2024-01-14' },
      { id: 'ORD-003', customer: 'John Smith', amount: 89.99, status: 'delivered', date: '2024-01-13' },
      { id: 'ORD-004', customer: 'Fatima Zahra', amount: 199.99, status: 'processing', date: '2024-01-12' }
    ]);
  }, []);

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      processing: 'info',
      shipped: 'primary',
      delivered: 'success',
      cancelled: 'danger'
    };
    return variants[status] || 'secondary';
  };

  const StatCard = ({ title, value, subtitle, icon, color }) => (
    <Card className="h-100 border-0 shadow-sm">
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h3 className="fw-bold mb-2" style={{ color: color }}>{value}</h3>
            <h6 className="text-muted mb-1">{title}</h6>
            <small className="text-muted">{subtitle}</small>
          </div>
          <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" 
               style={{ width: '50px', height: '50px' }}>
            {icon}
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold mb-2">Dashboard Overview</h2>
        <p className="text-muted mb-0">Welcome back! Here's your business summary.</p>
      </div>

      {/* Stats Cards */}
      <Row className="g-4 mb-5">
        <Col md={3}>
          <StatCard 
            title="Total Products" 
            value={stats.totalProducts} 
            subtitle="Active listings"
            color="#ed7418"
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ed7418" strokeWidth="2">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
            </svg>}
          />
        </Col>
        <Col md={3}>
          <StatCard 
            title="Total Orders" 
            value={stats.totalOrders} 
            subtitle="This month"
            color="#3b82f6"
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>}
          />
        </Col>
        <Col md={3}>
          <StatCard 
            title="Total Revenue" 
            value={`$${stats.totalRevenue}`} 
            subtitle="Lifetime"
            color="#10b981"
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>}
          />
        </Col>
        <Col md={3}>
          <StatCard 
            title="Low Stock" 
            value={stats.lowStockItems} 
            subtitle="Need attention"
            color="#f59e0b"
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>}
          />
        </Col>
      </Row>

      {/* Recent Orders */}
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-bottom py-4">
          <h5 className="fw-bold mb-0">Recent Orders</h5>
        </Card.Header>
        <Card.Body className="p-0">
          <Table hover className="mb-0">
            <thead className="bg-light">
              <tr>
                <th className="border-0 ps-4 py-3">Order ID</th>
                <th className="border-0 py-3">Customer</th>
                <th className="border-0 py-3">Amount</th>
                <th className="border-0 py-3">Status</th>
                <th className="border-0 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="ps-4">{order.id}</td>
                  <td>{order.customer}</td>
                  <td>${order.amount}</td>
                  <td>
                    <Badge bg={getStatusBadge(order.status)} className="text-capitalize">
                      {order.status}
                    </Badge>
                  </td>
                  <td>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DashboardOverview;