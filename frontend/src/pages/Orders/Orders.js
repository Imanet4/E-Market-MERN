import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { ordersAPI } from '../../services/orders';
import { getMockOrders } from '../../utils/mockData';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, [user]);

  useEffect(() => {
    filterOrders();
  }, [orders, statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      
      // Try real API first
      try {
        let response;
        if (user?.role === 'buyer') {
          response = await ordersAPI.getMyOrders();
        } else if (user?.role === 'seller') {
          response = await ordersAPI.getCooperativeOrders();
        } else if (user?.role === 'admin') {
          response = await ordersAPI.getAllOrders();
        }

        if (response?.data?.data) {
          setOrders(response.data.data);
          setUsingMockData(false);
        } else {
          throw new Error('No data from API');
        }
      } catch (apiError) {
        console.warn('API not available, using mock data:', apiError);
        const mockOrders = getMockOrders(user?.role);
        setOrders(mockOrders);
        setUsingMockData(true);
        setError('Connected to demo mode with sample order data');
        setTimeout(() => setError(''), 3000);
      }

    } catch (err) {
      setError('Failed to load orders');
      console.error('Orders error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = orders;
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    
    setFilteredOrders(filtered);
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      confirmed: 'info',
      processing: 'primary',
      shipped: 'success',
      delivered: 'success',
      cancelled: 'danger',
      refunded: 'secondary'
    };
    return variants[status] || 'secondary';
  };

  const getStatusText = (status) => {
    const statusMap = {
      pending: 'Pending',
      confirmed: 'Confirmed', 
      processing: 'Processing',
      shipped: 'Shipped',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
      refunded: 'Refunded'
    };
    return statusMap[status] || status;
  };

  const getTimelineDate = (order, step) => {
    const date = order.timeline?.[step];
    return date ? new Date(date).toLocaleDateString() : '—';
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      if (usingMockData) {
        // Update mock data
        setOrders(orders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        ));
        setError(`Order status updated to ${newStatus} in demo data`);
      } else {
        await ordersAPI.updateOrderStatus(orderId, { status: newStatus });
        setError(`Order status updated to ${newStatus}`);
        fetchOrders(); // Refresh
      }
      setTimeout(() => setError(''), 3000);
    } catch (err) {
      setError('Failed to update order status');
      console.error('Update status error:', err);
    }
  };

  if (loading) {
    return (
      <Container className="py-5" style={{ marginTop: '80px' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Loading your orders...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4" style={{ marginTop: '80px', minHeight: '100vh' }}>
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold mb-2">
            {user?.role === 'buyer' ? 'My Orders' : 
             user?.role === 'seller' ? 'Cooperative Orders' : 'All Orders'}
          </h2>
          <p className="text-muted mb-0">
            {user?.role === 'buyer' ? 'Track and manage your purchases' :
             user?.role === 'seller' ? 'Manage orders for your cooperative' : 
             'Manage all platform orders'}
          </p>
        </Col>
        <Col xs="auto">
          <Form.Select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Alerts */}
      {error && (
        <Alert variant={usingMockData ? 'warning' : 'info'} dismissible onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <Card className="border-0 shadow-sm">
          <Card.Body className="text-center py-5">
            <div className="text-muted mb-3">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </div>
            <h5 className="text-muted">No orders found</h5>
            <p className="text-muted mb-0">
              {statusFilter !== 'all' ? `No orders with status "${statusFilter}"` : 'You have no orders yet'}
            </p>
          </Card.Body>
        </Card>
      ) : (
        <Card className="border-0 shadow-sm">
          <Card.Body className="p-0">
            <Table hover responsive className="mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="border-0 ps-4 py-3">Order #</th>
                  {user?.role !== 'buyer' && <th className="border-0 py-3">Customer</th>}
                  <th className="border-0 py-3">Items</th>
                  <th className="border-0 py-3">Total</th>
                  <th className="border-0 py-3">Status</th>
                  <th className="border-0 py-3">Order Date</th>
                  <th className="border-0 pe-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id}>
                    <td className="ps-4">
                      <div className="fw-semibold">{order.orderNumber}</div>
                      <small className="text-muted">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </small>
                    </td>
                    
                    {user?.role !== 'buyer' && (
                      <td>
                        <div className="fw-semibold">
                          {order.user?.profile?.firstName} {order.user?.profile?.lastName}
                        </div>
                        <small className="text-muted">{order.user?.email}</small>
                      </td>
                    )}
                    
                    <td>
                      {order.items.slice(0, 2).map((item, index) => (
                        <div key={index} className="small">
                          {item.product.name} (x{item.quantity})
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <small className="text-muted">
                          +{order.items.length - 2} more items
                        </small>
                      )}
                    </td>
                    
                    <td>
                      <div className="fw-semibold">${order.total}</div>
                      <small className="text-muted">incl. shipping & tax</small>
                    </td>
                    
                    <td>
                      <Badge bg={getStatusBadge(order.status)} className="text-capitalize">
                        {getStatusText(order.status)}
                      </Badge>
                    </td>
                    
                    <td>
                      <small className="text-muted">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </small>
                    </td>
                    
                    <td className="pe-4">
                      <div className="d-flex gap-2">
                        <Button size="sm" variant="outline-primary">
                          View Details
                        </Button>
                        {(user?.role === 'seller' || user?.role === 'admin') && 
                         order.status === 'confirmed' && (
                          <Button 
                            size="sm" 
                            variant="outline-success"
                            onClick={() => handleStatusUpdate(order._id, 'processing')}
                          >
                            Process
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Orders;