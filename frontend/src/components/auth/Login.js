import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');
      await login(data);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Mosque SVG Icon
  const MosqueIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L22 8V22H2V8L12 2Z"></path>
      <path d="M12 22V12"></path>
      <path d="M17 12H7"></path>
      <path d="M8 8H16"></path>
      <path d="M6 16H18"></path>
      <path d="M6 19H18"></path>
    </svg>
  );

  // Demo Info SVG Icon
  const DemoInfoIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  );

  return (
    <Container className="py-5 mt-4">
      <Row className="justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Col md={6} lg={4}>
          <Card className="shadow tile-border mx-auto" style={{ maxWidth: '400px' }}>
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <div style={{ color: 'var(--royal)' }}>
                  <MosqueIcon />
                </div>
                <h3 className="mt-3" style={{ color: 'var(--royal)' }}>Welcome Back</h3>
                <p className="text-earth">Sign in to your account</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit(onSubmit)}>
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

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
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
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </Form>

              <div className="text-center mt-4">
                <p className="text-earth">
                  Don't have an account?{' '}
                  <Link 
                    to="/register" 
                    className="text-decoration-none"
                    style={{ color: 'var(--royal)' }}
                  >
                    Sign up here
                  </Link>
                </p>
              </div>

              {/* Demo Accounts Hint */}
              <div className="mt-4 p-3 rounded d-flex align-items-center justify-content-center" 
                   style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)' }}>
                <div className="me-2" style={{ color: 'var(--gold)' }}>
                  <DemoInfoIcon />
                </div>
                <small className="text-center text-earth">
                  <strong>Demo:</strong> Use any email/password to test
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;