import React, { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Form, 
  Button, 
  Alert,
  Badge,
  Table
} from 'react-bootstrap';
import { adminAPI } from '../../services/admin';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    platformName: 'AtlasMarket',
    platformCommission: 15,
    currency: 'MAD',
    defaultLanguage: 'en',
    maintenanceMode: false,
    userRegistration: true,
    sellerApprovalRequired: true,
    maxProductsPerSeller: 50,
    lowStockThreshold: 5,
    orderAutoCancelHours: 24
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      // In a real app, you'd fetch from API
      // const response = await adminAPI.getSystemSettings();
      // setSettings(response.data);
      
      // For now, using default settings
      setLoading(false);
    } catch (err) {
      setError('Failed to load system settings');
      console.error('Settings error:', err);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');

      // In a real app, you'd save to API
      // await adminAPI.updateSystemSettings(settings);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('System settings updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to save system settings');
      console.error('Save settings error:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setSettings({
      platformName: 'AtlasMarket',
      platformCommission: 15,
      currency: 'MAD',
      defaultLanguage: 'en',
      maintenanceMode: false,
      userRegistration: true,
      sellerApprovalRequired: true,
      maxProductsPerSeller: 50,
      lowStockThreshold: 5,
      orderAutoCancelHours: 24
    });
    setSuccess('Settings reset to defaults');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Loading system settings...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Alerts */}
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError('')}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" dismissible onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      <div className="mb-4">
        <h2 className="fw-bold mb-2">System Settings</h2>
        <p className="text-muted mb-0">Configure platform-wide settings and preferences.</p>
      </div>

      <Row className="g-4">
        {/* General Settings */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white border-bottom py-4">
              <h5 className="fw-bold mb-0">General Settings</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Platform Name</Form.Label>
                <Form.Control
                  type="text"
                  value={settings.platformName}
                  onChange={(e) => handleSettingChange('platformName', e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Platform Commission (%)</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  max="50"
                  step="0.5"
                  value={settings.platformCommission}
                  onChange={(e) => handleSettingChange('platformCommission', parseFloat(e.target.value))}
                />
                <Form.Text className="text-muted">
                  Percentage taken from each sale as platform fee
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Default Currency</Form.Label>
                <Form.Select
                  value={settings.currency}
                  onChange={(e) => handleSettingChange('currency', e.target.value)}
                >
                  <option value="MAD">Moroccan Dirham (MAD)</option>
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="GBP">British Pound (GBP)</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Default Language</Form.Label>
                <Form.Select
                  value={settings.defaultLanguage}
                  onChange={(e) => handleSettingChange('defaultLanguage', e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="ar">Arabic</option>
                </Form.Select>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        {/* User & Seller Settings */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white border-bottom py-4">
              <h5 className="fw-bold mb-0">User & Seller Settings</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  label="Allow User Registration"
                  checked={settings.userRegistration}
                  onChange={(e) => handleSettingChange('userRegistration', e.target.checked)}
                />
                <Form.Text className="text-muted">
                  Allow new users to register on the platform
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  label="Require Seller Approval"
                  checked={settings.sellerApprovalRequired}
                  onChange={(e) => handleSettingChange('sellerApprovalRequired', e.target.checked)}
                />
                <Form.Text className="text-muted">
                  New sellers require admin approval before they can list products
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Max Products Per Seller</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  max="1000"
                  value={settings.maxProductsPerSeller}
                  onChange={(e) => handleSettingChange('maxProductsPerSeller', parseInt(e.target.value))}
                />
                <Form.Text className="text-muted">
                  Maximum number of products a seller can list
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Low Stock Threshold</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={settings.lowStockThreshold}
                  onChange={(e) => handleSettingChange('lowStockThreshold', parseInt(e.target.value))}
                />
                <Form.Text className="text-muted">
                  Quantity at which products are considered low stock
                </Form.Text>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Order Settings */}
      <Row className="g-4 mt-0">
        <Col lg={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-bottom py-4">
              <h5 className="fw-bold mb-0">Order Settings</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Auto-cancel Unpaid Orders (Hours)</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  max="168"
                  value={settings.orderAutoCancelHours}
                  onChange={(e) => handleSettingChange('orderAutoCancelHours', parseInt(e.target.value))}
                />
                <Form.Text className="text-muted">
                  Automatically cancel orders that are not paid within this time
                </Form.Text>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        {/* System Status */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-bottom py-4">
              <h5 className="fw-bold mb-0">System Status</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  label="Maintenance Mode"
                  checked={settings.maintenanceMode}
                  onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                />
                <Form.Text className="text-muted">
                  When enabled, only admins can access the platform
                </Form.Text>
              </Form.Group>

              <div className="mt-4">
                <h6 className="fw-semibold mb-3">System Information</h6>
                <Table borderless size="sm">
                  <tbody>
                    <tr>
                      <td className="text-muted">Platform Version</td>
                      <td className="fw-semibold">v1.2.0</td>
                    </tr>
                    <tr>
                      <td className="text-muted">Last Backup</td>
                      <td className="fw-semibold">2024-01-15 02:00</td>
                    </tr>
                    <tr>
                      <td className="text-muted">System Status</td>
                      <td>
                        <Badge bg="success">Operational</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-muted">Database Size</td>
                      <td className="fw-semibold">245 MB</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Action Buttons */}
      <Row className="g-4 mt-0">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center py-4">
              <div className="d-flex justify-content-center gap-3">
                <Button 
                  variant="outline-secondary" 
                  onClick={handleReset}
                  disabled={saving}
                >
                  Reset to Defaults
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Saving...
                    </>
                  ) : (
                    'Save Settings'
                  )}
                </Button>
              </div>
              <p className="text-muted mt-3 mb-0">
                Changes to system settings may affect platform functionality.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SystemSettings;