import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { login } = useAuth(); // We'll use login after registration
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const password = watch('password');
  const selectedRole = watch('role');

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');
      
      // Prepare registration data
      const userData = {
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.role,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone
      };

      // Add cooperative name if seller
      if (data.role === 'seller') {
        userData.cooperativeName = data.cooperativeName;
      }

      // Register user
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include'
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }

      // Auto-login after successful registration
      await login({ email: data.email, password: data.password });
      navigate('/');

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Celebration SVG Icon
  const CelebrationIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      <line x1="12" y1="2" x2="12" y2="22"></line>
      <line x1="22" y1="9.27" x2="2" y2="9.27"></line>
      <line x1="15.09" y1="8.26" x2="8.91" y2="21.02"></line>
      <line x1="18.18" y1="21.02" x2="5.82" y2="8.26"></line>
      <line x1="17" y1="14.14" x2="7" y2="14.14"></line>
    </svg>
  );

  // Cooperative SVG Icon
  const CooperativeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );

  return (
    <Container className="py-5 mt-4">
      <Row className="justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Col md={8} lg={6}>
          <Card className="shadow tile-border mx-auto">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <div style={{ color: 'var(--royal)' }}>
                  <CelebrationIcon />
                </div>
                <h3 className="mt-3" style={{ color: 'var(--royal)' }}>Join Our Community</h3>
                <p className="text-earth">Create your account</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your first name"
                        {...register('firstName', {
                          required: 'First name is required'
                        })}
                        isInvalid={errors.firstName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your last name"
                        {...register('lastName', {
                          required: 'Last name is required'
                        })}
                        isInvalid={errors.lastName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Choose a username"
                    {...register('username', {
                      required: 'Username is required',
                      minLength: {
                        value: 3,
                        message: 'Username must be at least 3 characters'
                      }
                    })}
                    isInvalid={errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    isInvalid={errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your phone number"
                    {...register('phone')}
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Create a password"
                        {...register('password', {
                          required: 'Password is required',
                          minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters'
                          }
                        })}
                        isInvalid={errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm your password"
                        {...register('confirmPassword', {
                          required: 'Please confirm your password',
                          validate: value =>
                            value === password || 'Passwords do not match'
                        })}
                        isInvalid={errors.confirmPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>Account Type</Form.Label>
                  <Form.Select
                    {...register('role', { required: 'Please select account type' })}
                    isInvalid={errors.role}
                  >
                    <option value="">Select account type</option>
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller (Cooperative)</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.role?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Conditional Cooperative Name Field */}
                {selectedRole === 'seller' && (
                  <Form.Group className="mb-4">
                    <Form.Label className="d-flex align-items-center">
                      <span className="me-2" style={{ color: 'var(--primary)' }}>
                        <CooperativeIcon />
                      </span>
                      Cooperative Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your cooperative name"
                      {...register('cooperativeName', {
                        required: selectedRole === 'seller' ? 'Cooperative name is required for seller accounts' : false
                      })}
                      isInvalid={errors.cooperativeName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.cooperativeName?.message}
                    </Form.Control.Feedback>
                    <Form.Text className="text-earth">
                      Required for seller accounts
                    </Form.Text>
                  </Form.Group>
                )}

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 py-2"
                  disabled={loading}
                  style={{ backgroundColor: 'var(--primary)', borderColor: 'var(--primary)' }}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </Form>

              <div className="text-center mt-4">
                <p className="text-earth">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="text-decoration-none"
                    style={{ color: 'var(--royal)' }}
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;