import React, { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Table, 
  Badge, 
  Button, 
  Form, 
  InputGroup, 
  Modal,
  Alert,
  Dropdown
} from 'react-bootstrap';
import { adminAPI } from '../../services/admin';
import { getMockUsers } from '../../utils/mockData';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, roleFilter, statusFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Try real API first, fallback to mock data
      try {
        const response = await adminAPI.getUsers();
        if (response.data && response.data.data) {
          setUsers(response.data.data);
          setUsingMockData(false);
        } else {
          throw new Error('No data from API');
        }
      } catch (apiError) {
        console.warn('API not available, using mock data:', apiError);
        const mockUsers = getMockUsers();
        setUsers(mockUsers);
        setUsingMockData(true);
        setError('Connected to demo mode with sample data');
        setTimeout(() => setError(''), 3000);
      }

    } catch (err) {
      setError('Failed to load users');
      console.error('User management error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.profile?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.profile?.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => 
        statusFilter === 'active' ? user.isActive : !user.isActive
      );
    }

    setFilteredUsers(filtered);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditForm({
      role: user.role,
      isActive: user.isActive
    });
    setShowEditModal(true);
  };

  const handleSave = async () => {
    try {
      if (usingMockData) {
        // Update mock data
        setUsers(users.map(user =>
          user._id === selectedUser._id
            ? { ...user, ...editForm }
            : user
        ));
        setSuccess('User updated in demo data');
      } else {
        // Real API call
        await adminAPI.updateUser(selectedUser._id, editForm);
        setSuccess('User updated successfully');
        fetchUsers(); // Refresh data
      }
      
      setShowEditModal(false);
      setSelectedUser(null);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update user');
      console.error('Update user error:', err);
    }
  };

  const handleDelete = async (userId, username) => {
    if (window.confirm(`Are you sure you want to delete user "${username}"? This action cannot be undone.`)) {
      try {
        if (usingMockData) {
          setUsers(users.filter(user => user._id !== userId));
          setSuccess('User deleted from demo data');
        } else {
          await adminAPI.deleteUser(userId);
          setSuccess('User deleted successfully');
          fetchUsers(); // Refresh data
        }
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Failed to delete user');
        console.error('Delete user error:', err);
      }
    }
  };

  const toggleUserStatus = async (user) => {
    try {
      const newStatus = !user.isActive;
      
      if (usingMockData) {
        setUsers(users.map(u =>
          u._id === user._id ? { ...u, isActive: newStatus } : u
        ));
        setSuccess(`User ${newStatus ? 'activated' : 'deactivated'} in demo data`);
      } else {
        await adminAPI.updateUser(user._id, { isActive: newStatus });
        setSuccess(`User ${newStatus ? 'activated' : 'deactivated'} successfully`);
        fetchUsers();
      }
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update user status');
      console.error('Toggle status error:', err);
    }
  };

  const getRoleBadge = (role) => {
    const variants = {
      admin: 'danger',
      seller: 'warning',
      buyer: 'info'
    };
    return variants[role] || 'secondary';
  };

  const getStatusBadge = (isActive) => {
    return isActive ? 
      <Badge bg="success">Active</Badge> : 
      <Badge bg="secondary">Inactive</Badge>;
  };

  const clearFilters = () => {
    setSearchTerm('');
    setRoleFilter('all');
    setStatusFilter('all');
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Loading users...</p>
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

      {/* Demo Mode Indicator */}
      {usingMockData && (
        <Alert variant="warning" className="mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <strong>Demo Mode</strong> - Using sample user data. Changes will be saved locally.
            </div>
            <Button 
              variant="outline-warning" 
              size="sm"
              onClick={fetchUsers}
            >
              Retry API Connection
            </Button>
          </div>
        </Alert>
      )}

      <div className="mb-4">
        <h2 className="fw-bold mb-2">User Management</h2>
        <p className="text-muted mb-0">Manage platform users, roles, and permissions.</p>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Row className="g-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Search Users</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search by name, email, or username..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Role</Form.Label>
                <Form.Select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  <option value="buyer">Buyers</option>
                  <option value="seller">Sellers</option>
                  <option value="admin">Admins</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex align-items-end">
              <Button 
                variant="outline-secondary" 
                onClick={clearFilters}
                className="w-100"
              >
                Clear Filters
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Users Table */}
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-bottom py-4">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="fw-bold mb-0">
              Users ({filteredUsers.length})
            </h5>
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={fetchUsers}
            >
              Refresh
            </Button>
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          <Table hover responsive className="mb-0">
            <thead className="bg-light">
              <tr>
                <th className="border-0 ps-4 py-3">User</th>
                <th className="border-0 py-3">Contact</th>
                <th className="border-0 py-3">Role</th>
                <th className="border-0 py-3">Cooperative</th>
                <th className="border-0 py-3">Status</th>
                <th className="border-0 py-3">Joined</th>
                <th className="border-0 pe-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-5 text-muted">
                    No users found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="ps-4">
                      <div className="d-flex align-items-center">
                        <div 
                          className="rounded-circle me-3 bg-light d-flex align-items-center justify-content-center"
                          style={{ width: '40px', height: '40px' }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </div>
                        <div>
                          <div className="fw-semibold">
                            {user.profile?.firstName} {user.profile?.lastName}
                          </div>
                          <small className="text-muted">@{user.username}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>{user.email}</div>
                      <small className="text-muted">{user.profile?.phone}</small>
                    </td>
                    <td>
                      <Badge bg={getRoleBadge(user.role)} className="text-capitalize">
                        {user.role}
                      </Badge>
                    </td>
                    <td>
                      {user.cooperative ? (
                        <span className="fw-semibold">{user.cooperative.name}</span>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td>
                      {getStatusBadge(user.isActive)}
                    </td>
                    <td>
                      <small className="text-muted">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </small>
                    </td>
                    <td className="pe-4">
                      <Dropdown>
                        <Dropdown.Toggle 
                          variant="outline-primary" 
                          size="sm" 
                          id={`dropdown-${user._id}`}
                        >
                          Actions
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => handleEdit(user)}>
                            Edit User
                          </Dropdown.Item>
                          <Dropdown.Item 
                            onClick={() => toggleUserStatus(user)}
                          >
                            {user.isActive ? 'Deactivate' : 'Activate'}
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item 
                            className="text-danger"
                            onClick={() => handleDelete(user._id, user.username)}
                            disabled={user.role === 'admin'} // Prevent deleting admins
                          >
                            Delete User
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Edit User Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Edit User: {selectedUser?.profile?.firstName} {selectedUser?.profile?.lastName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  value={editForm.role}
                  onChange={(e) => setEditForm({...editForm, role: e.target.value})}
                >
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                </Form.Select>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Active Account"
                  checked={editForm.isActive}
                  onChange={(e) => setEditForm({...editForm, isActive: e.target.checked})}
                />
                <Form.Text className="text-muted">
                  Inactive users cannot log in to the platform.
                </Form.Text>
              </Form.Group>

              {usingMockData && (
                <Alert variant="info" className="mt-3">
                  <small>Demo Mode: Changes will be saved locally only</small>
                </Alert>
              )}
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserManagement;