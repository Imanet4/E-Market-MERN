import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Alert, Tab, Tabs } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const Profile = () => {
  const { user, updateDetails, updatePassword } = useAuth();
  const { cartItems, getCartTotal } = useCart();
  const [activeTab, setActiveTab] = useState('profile');
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [loading, setLoading] = useState(false);

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    language: 'en',
    currency: 'MAD'
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (user) {
      setProfileForm({
        firstName: user.profile?.firstName || '',
        lastName: user.profile?.lastName || '',
        email: user.email || '',
        phone: user.profile?.phone || '',
        language: user.preferences?.language || 'en',
        currency: user.preferences?.currency || 'MAD'
      });
    }
  }, [user]);

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 5000);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateDetails({
        firstName: profileForm.firstName,
        lastName: profileForm.lastName,
        phone: profileForm.phone,
        language: profileForm.language,
        currency: profileForm.currency
      });
      showAlert('Profile updated successfully!', 'success');
    } catch (error) {
      showAlert('Error updating profile', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showAlert('New passwords do not match', 'danger');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      showAlert('New password must be at least 6 characters', 'danger');
      return;
    }

    setLoading(true);

    try {
      await updatePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      showAlert('Password updated successfully!', 'success');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      showAlert('Error updating password. Please check your current password.', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadge = (role) => {
    const variants = {
      buyer: { bg: 'primary', text: 'Buyer' },
      seller: { bg: 'success', text: 'Seller' },
      admin: { bg: 'danger', text: 'Admin' }
    };
    
    const roleInfo = variants[role] || { bg: 'secondary', text: role };
    return (
      <Badge bg={roleInfo.bg} className="text-capitalize">
        {roleInfo.text}
      </Badge>
    );
  };

  const getCooperativeBadge = () => {
    if (user?.role === 'seller' && user?.cooperative) {
      return (
        <Badge bg="warning" text="dark" className="ms-2">
          🏺 {user.cooperative.name}
        </Badge>
      );
    }
    return null;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) {
    return (
      <Container className="py-5" style={{ marginTop: '80px' }}>
        <div className="text-center">
          <h2>Please log in to view your profile</h2>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5" style={{ marginTop: '80px' }}>
      {alert.show && (
        <Alert variant={alert.type} dismissible onClose={() => setAlert({ show: false, message: '', type: '' })}>
          {alert.message}
        </Alert>
      )}

      <Row>
        <Col lg={4} className="mb-4">
          {/* User Info Card */}
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center p-4">
              <div className="mb-4">
                <div 
                  className="rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(135deg, var(--primary) 0%, var(--royal) 100%)',
                    color: 'white',
                    fontSize: '2rem'
                  }}
                >
                  {user.profile?.firstName?.charAt(0) || user.username?.charAt(0) || 'U'}
                </div>
                <h4 className="fw-bold mb-2">
                  {user.profile?.firstName} {user.profile?.lastName}
                </h4>
                <div className="mb-3">
                  {getRoleBadge(user.role)}
                  {getCooperativeBadge()}
                </div>
                <p className="text-muted mb-0">@{user.username}</p>
              </div>

              <hr />

              {/* Quick Stats */}
              <div className="text-start">
                <h6 className="fw-bold mb-3">Account Overview</h6>
                
                <div className="mb-3">
                  <small className="text-muted d-block">Member since</small>
                  <div className="fw-semibold">
                    {formatDate(user.createdAt)}
                  </div>
                </div>

                <div className="mb-3">
                  <small className="text-muted d-block">Email</small>
                  <div className="fw-semibold">{user.email}</div>
                </div>

                {user.profile?.phone && (
                  <div className="mb-3">
                    <small className="text-muted d-block">Phone</small>
                    <div className="fw-semibold">{user.profile.phone}</div>
                  </div>
                )}

                {user.role === 'buyer' && (
                  <>
                    <div className="mb-3">
                      <small className="text-muted d-block">Cart Items</small>
                      <div className="fw-semibold">
                        {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
                      </div>
                    </div>

                    <div className="mb-3">
                      <small className="text-muted d-block">Cart Total</small>
                      <div className="fw-semibold" style={{ color: 'var(--primary)' }}>
                        ${getCartTotal().toFixed(2)}
                      </div>
                    </div>
                  </>
                )}

                {user.role === 'seller' && user.cooperative && (
                  <div className="mb-3">
                    <small className="text-muted d-block">Cooperative</small>
                    <div className="fw-semibold">
                      {user.cooperative.name}
                    </div>
                    {user.cooperative.isVerified && (
                      <Badge bg="success" className="mt-1">
                        ✓ Verified
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-0">
              <Tabs
                activeKey={activeTab}
                onSelect={(tab) => setActiveTab(tab)}
                className="px-4 pt-4"
              >
                {/* Profile Tab */}
                <Tab eventKey="profile" title="Profile Information">
                  <div className="p-4">
                    <h5 className="fw-bold mb-4">Personal Information</h5>
                    <Form onSubmit={handleProfileUpdate}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                              type="text"
                              value={profileForm.firstName}
                              onChange={(e) => setProfileForm(prev => ({
                                ...prev,
                                firstName: e.target.value
                              }))}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              type="text"
                              value={profileForm.lastName}
                              onChange={(e) => setProfileForm(prev => ({
                                ...prev,
                                lastName: e.target.value
                              }))}
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          value={profileForm.email}
                          disabled
                          className="bg-light"
                        />
                        <Form.Text className="text-muted">
                          Email cannot be changed
                        </Form.Text>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="tel"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm(prev => ({
                            ...prev,
                            phone: e.target.value
                          }))}
                          placeholder="Enter your phone number"
                        />
                      </Form.Group>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Preferred Language</Form.Label>
                            <Form.Select
                              value={profileForm.language}
                              onChange={(e) => setProfileForm(prev => ({
                                ...prev,
                                language: e.target.value
                              }))}
                            >
                              <option value="en">English</option>
                              <option value="fr">Français</option>
                              <option value="ar">العربية</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Preferred Currency</Form.Label>
                            <Form.Select
                              value={profileForm.currency}
                              onChange={(e) => setProfileForm(prev => ({
                                ...prev,
                                currency: e.target.value
                              }))}
                            >
                              <option value="MAD">Moroccan Dirham (MAD)</option>
                              <option value="USD">US Dollar (USD)</option>
                              <option value="EUR">Euro (EUR)</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <div className="d-flex justify-content-end">
                        <Button 
                          type="submit" 
                          disabled={loading}
                          style={{ 
                            backgroundColor: 'var(--primary)',
                            borderColor: 'var(--primary)'
                          }}
                        >
                          {loading ? 'Updating...' : 'Update Profile'}
                        </Button>
                      </div>
                    </Form>
                  </div>
                </Tab>

                {/* Security Tab */}
                <Tab eventKey="security" title="Security">
                  <div className="p-4">
                    <h5 className="fw-bold mb-4">Change Password</h5>
                    <Form onSubmit={handlePasswordUpdate}>
                      <Form.Group className="mb-3">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                          type="password"
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm(prev => ({
                            ...prev,
                            currentPassword: e.target.value
                          }))}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                          type="password"
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm(prev => ({
                            ...prev,
                            newPassword: e.target.value
                          }))}
                          required
                          minLength={6}
                        />
                        <Form.Text className="text-muted">
                          Password must be at least 6 characters long
                        </Form.Text>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm(prev => ({
                            ...prev,
                            confirmPassword: e.target.value
                          }))}
                          required
                        />
                      </Form.Group>

                      <div className="d-flex justify-content-end">
                        <Button 
                          type="submit" 
                          disabled={loading}
                          style={{ 
                            backgroundColor: 'var(--primary)',
                            borderColor: 'var(--primary)'
                          }}
                        >
                          {loading ? 'Updating...' : 'Change Password'}
                        </Button>
                      </div>
                    </Form>
                  </div>
                </Tab>

                {/* Account Type Tab */}
                <Tab eventKey="account" title="Account Type">
                  <div className="p-4">
                    <h5 className="fw-bold mb-4">Account Information</h5>
                    
                    <div className="mb-4">
                      <h6>Role & Permissions</h6>
                      <div className="d-flex align-items-center gap-3 mb-3">
                        {getRoleBadge(user.role)}
                        <span className="text-muted">
                          {user.role === 'buyer' && 'You can browse and purchase products from cooperatives'}
                          {user.role === 'seller' && 'You can manage products and orders for your cooperative'}
                          {user.role === 'admin' && 'You have full administrative access to the platform'}
                        </span>
                      </div>
                    </div>

                    {user.role === 'seller' && user.cooperative && (
                      <div className="mb-4">
                        <h6>Cooperative Details</h6>
                        <Card className="bg-light border-0">
                          <Card.Body>
                            <div className="d-flex justify-content-between align-items-start">
                              <div>
                                <h6 className="fw-bold mb-1">{user.cooperative.name}</h6>
                                <p className="text-muted mb-2">{user.cooperative.description}</p>
                                <div className="d-flex gap-2">
                                  <Badge bg="light" text="dark">
                                    📧 {user.cooperative.contact?.email}
                                  </Badge>
                                  {user.cooperative.contact?.phone && (
                                    <Badge bg="light" text="dark">
                                      📞 {user.cooperative.contact.phone}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <div className="text-end">
                                {user.cooperative.isVerified ? (
                                  <Badge bg="success">Verified Cooperative</Badge>
                                ) : (
                                  <Badge bg="warning" text="dark">Pending Verification</Badge>
                                )}
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                    )}

                    <div className="mb-4">
                      <h6>Account Actions</h6>
                      <div className="d-flex gap-2">
                        {user.role === 'buyer' && (
                          <Button variant="outline-primary" size="sm">
                            Apply to Become a Seller
                          </Button>
                        )}
                        <Button variant="outline-danger" size="sm">
                          Deactivate Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;