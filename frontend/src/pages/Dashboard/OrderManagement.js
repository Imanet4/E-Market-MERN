import React, { useState, useEffect } from 'react';
import { Card, Table, Badge, Button, Row, Col, Alert } from 'react-bootstrap';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    // Mock data - replace with API call to cooperative orders
    const mockOrders = [
      {
        _id: '1',
        orderNumber: 'ORD-001',
        user: { profile: { firstName: 'Ahmed', lastName: 'Benali' } },
        items: [{ product: { name: 'Argan Oil' }, quantity: 2, price: 29.99 }],
        total: 59.98,
        status: 'pending',
        createdAt: '2024-01-15'
      },
      {
        _id: '2',
        orderNumber: 'ORD-002',
        user: { profile: { firstName: 'Marie', lastName: 'Dubois' } },
        items: [{ product: { name: 'Berber Rug' }, quantity: 1, price: 199.99 }],
        total: 199.99,
        status: 'processing',
        createdAt: '2024-01-14'
      },
      {
        _id: '3',
        orderNumber: 'ORD-003',
        user: { profile: { firstName: 'John', lastName: 'Smith' } },
        items: [{ product: { name: 'Spice Box' }, quantity: 1, price: 39.99 }],
        total: 39.99,
        status: 'shipped',
        createdAt: '2024-01-13'
      },
      {
        _id: '4',
        orderNumber: 'ORD-004',
        user: { profile: { firstName: 'Fatima', lastName: 'Zahra' } },
        items: [{ product: { name: 'Ceramic Pot' }, quantity: 3, price: 25.99 }],
        total: 77.97,
        status: 'pending',
        createdAt: '2024-01-12'
      }
    ];
    setOrders(mockOrders);
  }, []);

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 5000);
  };

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

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      // Mock API call
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
      showAlert(`Order status updated to ${newStatus}`, 'success');
    } catch (error) {
      showAlert('Error updating order status', 'danger');
    }
  };

  const getNextStatusAction = (currentStatus) => {
    const actions = {
      pending: { label: 'Process Order', nextStatus: 'processing' },
      processing: { label: 'Mark as Shipped', nextStatus: 'shipped' },
      shipped: { label: 'Mark as Delivered', nextStatus: 'delivered' }
    };
    return actions[currentStatus] || null;
  };

  return (
    <div>
      {alert.show && (
        <Alert variant={alert.type} dismissible onClose={() => setAlert({ show: false, message: '', type: '' })}>
          {alert.message}
        </Alert>
      )}

      <div className="mb-4">
        <h2 className="fw-bold mb-2">Order Management</h2>
        <p className="text-muted mb-0">Manage and track customer orders.</p>
      </div>

      <Row className="g-4 mb-4">
        <Col md={3}>
          <Card className="text-center border-warning">
            <Card.Body className="p-4">
              <div className="h4 fw-bold text-warning">{orders.filter(o => o.status === 'pending').length}</div>
              <small className="text-muted">Pending Orders</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-info">
            <Card.Body className="p-4">
              <div className="h4 fw-bold text-info">{orders.filter(o => o.status === 'processing').length}</div>
              <small className="text-muted">Processing</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-primary">
            <Card.Body className="p-4">
              <div className="h4 fw-bold text-primary">{orders.filter(o => o.status === 'shipped').length}</div>
              <small className="text-muted">Shipped</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-success">
            <Card.Body className="p-4">
              <div className="h4 fw-bold text-success">{orders.filter(o => o.status === 'delivered').length}</div>
              <small className="text-muted">Delivered</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          <Table hover responsive>
            <thead className="bg-light">
              <tr>
                <th className="border-0 ps-4 py-3">Order ID</th>
                <th className="border-0 py-3">Customer</th>
                <th className="border-0 py-3">Items</th>
                <th className="border-0 py-3">Total</th>
                <th className="border-0 py-3">Status</th>
                <th className="border-0 py-3">Date</th>
                <th className="border-0 pe-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const nextAction = getNextStatusAction(order.status);
                return (
                  <tr key={order._id}>
                    <td className="ps-4">{order.orderNumber}</td>
                    <td>{order.user.profile.firstName} {order.user.profile.lastName}</td>
                    <td>
                      {order.items.map((item, index) => (
                        <div key={index} className="small">
                          {item.product.name} (x{item.quantity})
                        </div>
                      ))}
                    </td>
                    <td>${order.total}</td>
                    <td>
                      <Badge bg={getStatusBadge(order.status)} className="text-capitalize">
                        {order.status}
                      </Badge>
                    </td>
                    <td>{order.createdAt}</td>
                    <td className="pe-4">
                      <div className="d-flex gap-2">
                        <Button size="sm" variant="outline-primary">View Details</Button>
                        {nextAction && (
                          <Button 
                            size="sm" 
                            variant="outline-success"
                            onClick={() => updateOrderStatus(order._id, nextAction.nextStatus)}
                          >
                            {nextAction.label}
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default OrderManagement;