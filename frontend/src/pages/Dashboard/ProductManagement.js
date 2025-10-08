import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Button, Badge, Form, Modal, Alert, Image } from 'react-bootstrap';
import { productsAPI } from '../../services/products';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [productImages, setProductImages] = useState([]);
  const [usingMockData, setUsingMockData] = useState(false);

  // Mock data for fallback
  const mockProducts = [
    {
      _id: '1',
      name: 'Premium Argan Oil',
      price: 29.99,
      stock: 45,
      status: 'active',
      category: 'cosmetics',
      description: '100% pure organic argan oil from Souss region',
      images: ['/placeholder.jpg'],
      salesCount: 156,
      cooperative: { name: 'Souss Women Cooperative' }
    },
    {
      _id: '2',
      name: 'Handwoven Berber Rug',
      price: 199.99,
      stock: 8,
      status: 'active',
      category: 'clothing',
      description: 'Traditional Berber rug with geometric patterns',
      images: ['/placeholder.jpg'],
      salesCount: 23,
      cooperative: { name: 'Atlas Mountains Weavers' }
    },
    {
      _id: '3',
      name: 'Moroccan Spice Box',
      price: 39.99,
      stock: 0,
      status: 'out-of-stock',
      category: 'edible-goods',
      description: 'Curated selection of authentic Moroccan spices',
      images: ['/placeholder.jpg'],
      salesCount: 89,
      cooperative: { name: 'Marrakech Spice Masters' }
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Try to fetch from API first
        const response = await productsAPI.getAll();
        if (response.data && response.data.data) {
          setProducts(response.data.data);
          setUsingMockData(false);
        } else {
          throw new Error('No data received from API');
        }
      } catch (error) {
        console.warn('API not available, using mock data:', error);
        // Fallback to mock data
        setProducts(mockProducts);
        setUsingMockData(true);
        showAlert('Connected to demo mode with sample data', 'info');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 5000);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setProductImages(product.images || []);
    setShowEditModal(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        if (!usingMockData) {
          // Real API call
          await productsAPI.delete(productId);
        }
        // Update local state (works for both API and mock data)
        setProducts(products.filter(p => p._id !== productId));
        showAlert('Product deleted successfully', 'success');
      } catch (error) {
        console.error('Error deleting product:', error);
        if (usingMockData) {
          // For mock data, still delete from local state
          setProducts(products.filter(p => p._id !== productId));
          showAlert('Product deleted from demo data', 'success');
        } else {
          showAlert('Error deleting product', 'danger');
        }
      }
    }
  };

  const handleSaveProduct = async (productData) => {
    try {
      let savedProduct;

      if (selectedProduct) {
        // Update existing product
        if (!usingMockData) {
          const response = await productsAPI.update(selectedProduct._id, {
            ...productData,
            images: productImages
          });
          savedProduct = response.data.data;
        } else {
          // Mock update for demo data
          savedProduct = {
            ...selectedProduct,
            ...productData,
            images: productImages
          };
        }
        
        setProducts(products.map(p => 
          p._id === selectedProduct._id ? savedProduct : p
        ));
        showAlert('Product updated successfully', 'success');
      } else {
        // Add new product
        if (!usingMockData) {
          const response = await productsAPI.create({
            ...productData,
            images: productImages
          });
          savedProduct = response.data.data;
        } else {
          // Mock creation for demo data
          savedProduct = {
            _id: Date.now().toString(),
            ...productData,
            images: productImages,
            salesCount: 0,
            cooperative: { name: 'Your Cooperative' }
          };
        }
        
        setProducts([...products, savedProduct]);
        showAlert('Product added successfully', 'success');
      }
      
      setShowAddModal(false);
      setShowEditModal(false);
      setSelectedProduct(null);
      setProductImages([]);
    } catch (error) {
      console.error('Error saving product:', error);
      if (usingMockData) {
        // For mock data, still add to local state
        const mockProduct = {
          _id: Date.now().toString(),
          ...productData,
          images: productImages,
          salesCount: 0,
          cooperative: { name: 'Your Cooperative' }
        };
        setProducts([...products, mockProduct]);
        setShowAddModal(false);
        setShowEditModal(false);
        setSelectedProduct(null);
        setProductImages([]);
        showAlert('Product added to demo data', 'success');
      } else {
        const errorMessage = error.response?.data?.message || 'Error saving product';
        showAlert(errorMessage, 'danger');
      }
    }
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (productImages.length + files.length > 5) {
      showAlert('Maximum 5 images allowed', 'warning');
      return;
    }
    
    // For demo purposes, create object URLs
    const newImages = files.map(file => ({
      url: URL.createObjectURL(file),
      name: file.name,
      file: file
    }));
    
    setProductImages([...productImages, ...newImages]);
  };

  const removeImage = (index) => {
    setProductImages(productImages.filter((_, i) => i !== index));
  };

  const getStatusBadge = (status) => {
    const variants = {
      active: 'success',
      inactive: 'secondary',
      'out-of-stock': 'warning',
      draft: 'info'
    };
    return variants[status] || 'secondary';
  };

  const ProductForm = ({ show, onHide, product, onSave }) => {
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      price: '',
      stock: '',
      category: '',
      status: 'active'
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
      if (product) {
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          category: product.category,
          status: product.status
        });
      } else {
        setFormData({
          name: '',
          description: '',
          price: '',
          stock: '',
          category: '',
          status: 'active'
        });
      }
    }, [product]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setSaving(true);
      try {
        await onSave(formData);
      } finally {
        setSaving(false);
      }
    };

    const handleChange = (field, value) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
      <Modal show={show} onHide={onHide} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{product ? 'Edit Product' : 'Add New Product'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {usingMockData && (
              <Alert variant="info" className="mb-3">
                <small>Demo Mode: Changes will be saved locally only</small>
              </Alert>
            )}
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Name *</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required 
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price ($) *</Form.Label>
                  <Form.Control 
                    type="number" 
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => handleChange('price', parseFloat(e.target.value))}
                    required 
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description *</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                required 
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category *</Form.Label>
                  <Form.Select 
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    required
                  >
                    <option value="">Select category</option>
                    <option value="edible-goods">Edible Goods</option>
                    <option value="cosmetics">Cosmetics</option>
                    <option value="clothing">Clothing</option>
                    <option value="accessories">Accessories</option>
                    <option value="souvenir-boxes">Souvenir Boxes</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock Quantity *</Form.Label>
                  <Form.Control 
                    type="number" 
                    min="0"
                    value={formData.stock}
                    onChange={(e) => handleChange('stock', parseInt(e.target.value) || 0)}
                    required 
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select 
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </Form.Select>
            </Form.Group>

            {/* Image Upload Section */}
            <Form.Group className="mb-3">
              <Form.Label>Product Images ({productImages.length}/5)</Form.Label>
              <Form.Control 
                type="file" 
                multiple 
                accept="image/*"
                onChange={handleImageUpload}
                disabled={productImages.length >= 5}
              />
              <Form.Text className="text-muted">
                Upload up to 5 images. First image will be used as main display.
              </Form.Text>
            </Form.Group>

            {/* Image Preview */}
            {productImages.length > 0 && (
              <div className="mb-3">
                <label className="form-label">Image Previews:</label>
                <div className="d-flex flex-wrap gap-2">
                  {productImages.map((image, index) => (
                    <div key={index} className="position-relative" style={{ width: '100px' }}>
                      <Image 
                        src={image.url} 
                        alt={`Preview ${index + 1}`}
                        thumbnail 
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      />
                      <Button
                        variant="danger"
                        size="sm"
                        className="position-absolute top-0 end-0"
                        style={{ transform: 'translate(50%, -50%)' }}
                        onClick={() => removeImage(index)}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={onHide} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? 'Saving...' : (product ? 'Update Product' : 'Add Product')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  };

  return (
    <div>
      {alert.show && (
        <Alert variant={alert.type} dismissible onClose={() => setAlert({ show: false, message: '', type: '' })}>
          {alert.message}
        </Alert>
      )}

      {/* Demo Mode Indicator */}
      {usingMockData && (
        <Alert variant="warning" className="mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <strong>Demo Mode</strong> - Using sample data. Products will be saved locally.
            </div>
            <Button 
              variant="outline-warning" 
              size="sm"
              onClick={() => {
                const fetchProducts = async () => {
                  try {
                    setLoading(true);
                    const response = await productsAPI.getAll();
                    if (response.data && response.data.data) {
                      setProducts(response.data.data);
                      setUsingMockData(false);
                      showAlert('Connected to live API successfully', 'success');
                    } else {
                      throw new Error('No data received from API');
                    }
                  } catch (error) {
                    console.warn('API still not available:', error);
                    showAlert('API not available, still using demo data', 'warning');
                  } finally {
                    setLoading(false);
                  }
                };
                fetchProducts();
              }}
            >
              Retry API Connection
            </Button>
          </div>
        </Alert>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-2">Product Management</h2>
          <p className="text-muted mb-0">Manage your product listings and inventory.</p>
        </div>
        <Button 
          variant="primary"
          onClick={() => setShowAddModal(true)}
          disabled={loading}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Product
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Loading products...</p>
        </div>
      ) : (
        <Card>
          <Card.Body className="p-0">
            <Table hover responsive>
              <thead>
                <tr>
                  <th className="ps-4">Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Sales</th>
                  <th className="pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-muted">
                      No products found. Click "Add Product" to create your first product.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product._id}>
                      <td className="ps-4">
                        <div className="d-flex align-items-center">
                          <div 
                            className="rounded me-3 bg-light"
                            style={{
                              width: '40px',
                              height: '40px',
                              background: 'linear-gradient(135deg, #ed7418 0%, #3b82f6 100%)'
                            }}
                          ></div>
                          <div>
                            <div className="fw-semibold">{product.name}</div>
                            <small className="text-muted">
                              {product.description ? `${product.description.substring(0, 50)}...` : 'No description'}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <Badge bg="light" text="dark" className="text-capitalize">
                          {product.category}
                        </Badge>
                      </td>
                      <td>${product.price}</td>
                      <td>
                        <span className={product.stock < 10 ? 'text-warning fw-semibold' : ''}>
                          {product.stock}
                        </span>
                      </td>
                      <td>
                        <Badge bg={getStatusBadge(product.status)} className="text-capitalize">
                          {product.status}
                        </Badge>
                      </td>
                      <td>{product.salesCount || 0}</td>
                      <td className="pe-4">
                        <div className="d-flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline-primary"
                            onClick={() => handleEdit(product)}
                          >
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline-danger"
                            onClick={() => handleDelete(product._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}

      <ProductForm 
        show={showAddModal || showEditModal}
        onHide={() => {
          setShowAddModal(false);
          setShowEditModal(false);
          setSelectedProduct(null);
          setProductImages([]);
        }}
        product={selectedProduct}
        onSave={handleSaveProduct}
      />
    </div>
  );
};

export default ProductManagement;