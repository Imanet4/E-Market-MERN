import React, { useState, useEffect } from 'react';
import { Card, Table, Badge, Button, ProgressBar, Row, Col, Modal, Form, Alert } from 'react-bootstrap';

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [restockQuantity, setRestockQuantity] = useState(0);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    // Mock data - replace with API call
    const mockInventory = [
      {
        _id: '1',
        name: 'Premium Argan Oil',
        sku: 'ARG-001',
        currentStock: 45,
        lowStockThreshold: 10,
        status: 'adequate'
      },
      {
        _id: '2',
        name: 'Handwoven Berber Rug',
        sku: 'RUG-001',
        currentStock: 8,
        lowStockThreshold: 5,
        status: 'low'
      },
      {
        _id: '3',
        name: 'Moroccan Spice Box',
        sku: 'SPC-001',
        currentStock: 0,
        lowStockThreshold: 5,
        status: 'out-of-stock'
      },
      {
        _id: '4',
        name: 'Ceramic Tagine Pot',
        sku: 'TAG-001',
        currentStock: 25,
        lowStockThreshold: 5,
        status: 'adequate'
      },
      {
        _id: '5',
        name: 'Leather Babouche',
        sku: 'BAB-001',
        currentStock: 3,
        lowStockThreshold: 5,
        status: 'low'
      }
    ];
    setInventory(mockInventory);
  }, []);

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 5000);
  };

  const getStockStatus = (current, threshold) => {
    if (current === 0) return 'out-of-stock';
    if (current <= threshold) return 'low';
    return 'adequate';
  };

  const getStatusVariant = (status) => {
    const variants = {
      adequate: 'success',
      low: 'warning',
      'out-of-stock': 'danger'
    };
    return variants[status] || 'secondary';
  };

  const getStockPercentage = (current, threshold) => {
    const max = threshold * 3;
    return Math.min((current / max) * 100, 100);
  };

  const handleRestock = (product) => {
    setSelectedProduct(product);
    setRestockQuantity(0);
    setShowRestockModal(true);
  };

  const confirmRestock = () => {
    if (restockQuantity <= 0) {
      showAlert('Please enter a valid quantity', 'warning');
      return;
    }

    try {
      setInventory(inventory.map(item => 
        item._id === selectedProduct._id 
          ? { 
              ...item, 
              currentStock: item.currentStock + parseInt(restockQuantity),
              status: getStockStatus(item.currentStock + parseInt(restockQuantity), item.lowStockThreshold)
            } 
          : item
      ));
      showAlert(`Successfully restocked ${selectedProduct.name}`, 'success');
      setShowRestockModal(false);
      setSelectedProduct(null);
      setRestockQuantity(0);
    } catch (error) {
      showAlert('Error restocking product', 'danger');
    }
  };

  const updateLowStockThreshold = (productId, newThreshold) => {
    setInventory(inventory.map(item => 
      item._id === productId 
        ? { 
            ...item, 
            lowStockThreshold: parseInt(newThreshold),
            status: getStockStatus(item.currentStock, parseInt(newThreshold))
          } 
        : item
    ));
  };

  return (
    <div>
      {alert.show && (
        <Alert variant={alert.type} dismissible onClose={() => setAlert({ show: false, message: '', type: '' })}>
          {alert.message}
        </Alert>
      )}

      <div className="mb-4">
        <h2 className="fw-bold mb-2">Inventory Management</h2>
        <p className="text-muted mb-0">Monitor and manage your product stock levels.</p>
      </div>

      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="text-center border-success">
            <Card.Body className="p-4">
              <div className="h3 fw-bold text-success">
                {inventory.filter(item => item.status === 'adequate').length}
              </div>
              <small className="text-muted">Adequate Stock</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center border-warning">
            <Card.Body className="p-4">
              <div className="h3 fw-bold text-warning">
                {inventory.filter(item => item.status === 'low').length}
              </div>
              <small className="text-muted">Low Stock</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center border-danger">
            <Card.Body className="p-4">
              <div className="h3 fw-bold text-danger">
                {inventory.filter(item => item.status === 'out-of-stock').length}
              </div>
              <small className="text-muted">Out of Stock</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          <Table hover responsive>
            <thead className="bg-light">
              <tr>
                <th className="border-0 ps-4 py-3">Product</th>
                <th className="border-0 py-3">SKU</th>
                <th className="border-0 py-3">Current Stock</th>
                <th className="border-0 py-3">Low Stock Threshold</th>
                <th className="border-0 py-3">Stock Level</th>
                <th className="border-0 py-3">Status</th>
                <th className="border-0 pe-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item._id}>
                  <td className="ps-4">{item.name}</td>
                  <td>
                    <Badge bg="light" text="dark">
                      {item.sku}
                    </Badge>
                  </td>
                  <td>
                    <div className="fw-semibold">{item.currentStock}</div>
                  </td>
                  <td style={{ width: '150px' }}>
                    <Form.Control 
                      type="number" 
                      size="sm"
                      value={item.lowStockThreshold}
                      onChange={(e) => updateLowStockThreshold(item._id, e.target.value)}
                    />
                  </td>
                  <td style={{ width: '200px' }}>
                    <ProgressBar 
                      variant={getStatusVariant(item.status)}
                      now={getStockPercentage(item.currentStock, item.lowStockThreshold)}
                      className="mb-1"
                    />
                    <small className="text-muted">
                      {Math.round(getStockPercentage(item.currentStock, item.lowStockThreshold))}%
                    </small>
                  </td>
                  <td>
                    <Badge bg={getStatusVariant(item.status)} className="text-capitalize">
                      {item.status.replace('-', ' ')}
                    </Badge>
                  </td>
                  <td className="pe-4">
                    <div className="d-flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline-primary"
                        onClick={() => handleRestock(item)}
                      >
                        Restock
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Restock Modal */}
      <Modal show={showRestockModal} onHide={() => setShowRestockModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Restock Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <div>
              <p>Product: <strong>{selectedProduct.name}</strong></p>
              <p>Current Stock: <strong>{selectedProduct.currentStock}</strong></p>
              <Form.Group>
                <Form.Label>Quantity to Add</Form.Label>
                <Form.Control 
                  type="number" 
                  value={restockQuantity}
                  onChange={(e) => setRestockQuantity(e.target.value)}
                  min="1"
                />
              </Form.Group>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowRestockModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmRestock}>
            Confirm Restock
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InventoryManagement;