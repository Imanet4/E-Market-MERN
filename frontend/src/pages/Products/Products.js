import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Badge, Pagination, Alert } from 'react-bootstrap';
import { productsAPI } from '../../services/products';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
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
      description: '100% pure organic argan oil from Souss region. Rich in vitamin E and antioxidants.',
      images: ['/placeholder.jpg'],
      cooperative: { 
        name: 'Souss Women Cooperative',
        logo: '/placeholder.jpg'
      },
      rating: { average: 4.5, count: 156 },
      createdAt: '2024-01-15'
    },
    {
      _id: '2',
      name: 'Handwoven Berber Rug',
      price: 199.99,
      stock: 8,
      status: 'active',
      category: 'clothing',
      description: 'Traditional Berber rug with authentic geometric patterns. Handcrafted by skilled artisans.',
      images: ['/placeholder.jpg'],
      cooperative: { 
        name: 'Atlas Mountains Weavers',
        logo: '/placeholder.jpg'
      },
      rating: { average: 4.8, count: 23 },
      createdAt: '2024-01-14'
    },
    {
      _id: '3',
      name: 'Moroccan Spice Box',
      price: 39.99,
      stock: 0,
      status: 'out-of-stock',
      category: 'edible-goods',
      description: 'Curated selection of authentic Moroccan spices including ras el hanout and saffron.',
      images: ['/placeholder.jpg'],
      cooperative: { 
        name: 'Marrakech Spice Masters',
        logo: '/placeholder.jpg'
      },
      rating: { average: 4.6, count: 89 },
      createdAt: '2024-01-13'
    },
    {
      _id: '4',
      name: 'Ceramic Tagine Pot',
      price: 49.99,
      stock: 25,
      status: 'active',
      category: 'accessories',
      description: 'Traditional clay tagine for authentic Moroccan cooking. Perfect for slow-cooked dishes.',
      images: ['/placeholder.jpg'],
      cooperative: { 
        name: 'Fes Pottery Artisans',
        logo: '/placeholder.jpg'
      },
      rating: { average: 4.7, count: 34 },
      createdAt: '2024-01-12'
    },
    {
      _id: '5',
      name: 'Leather Babouche',
      price: 35.99,
      stock: 15,
      status: 'active',
      category: 'clothing',
      description: 'Traditional Moroccan leather slippers with intricate embroidery and comfortable fit.',
      images: ['/placeholder.jpg'],
      cooperative: { 
        name: 'Marrakech Leather Crafts',
        logo: '/placeholder.jpg'
      },
      rating: { average: 4.4, count: 67 },
      createdAt: '2024-01-11'
    },
    {
      _id: '6',
      name: 'Souvenir Box - Classic',
      price: 79.99,
      stock: 12,
      status: 'active',
      category: 'souvenir-boxes',
      description: 'Perfect introduction to Moroccan crafts with assorted traditional items and keepsakes.',
      images: ['/placeholder.jpg'],
      cooperative: { 
        name: 'AtlasMarket Curators',
        logo: '/placeholder.jpg'
      },
      rating: { average: 4.9, count: 45 },
      createdAt: '2024-01-10'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'edible-goods', label: 'Edible Goods' },
    { value: 'cosmetics', label: 'Cosmetics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'souvenir-boxes', label: 'Souvenir Boxes' }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

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
      showAlert('Displaying sample products', 'info');
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 5000);
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.cooperative?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-warning">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-warning">★</span>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-muted">★</span>);
    }
    
    return stars;
  };

  const ProductCard = ({ product }) => (
    <Col lg={4} md={6} className="mb-4">
      <Card className="h-100 border-0 shadow-sm product-card">
        <div className="position-relative">
          <Card.Img 
            variant="top"
            src={`https://via.placeholder.com/300x200/ED7418/FFFFFF?text=${encodeURIComponent(product.name)}`}
            style={{ height: '200px', objectFit: 'cover' }}
          />
          {product.stock === 0 && (
            <div className="position-absolute top-0 start-0 m-2">
              <Badge bg="danger">Out of Stock</Badge>
            </div>
          )}
          {product.rating && (
            <div className="position-absolute top-0 end-0 m-2">
              <Badge bg="light" text="dark" className="d-flex align-items-center">
                {renderStars(product.rating.average)}
                <small className="ms-1">({product.rating.count})</small>
              </Badge>
            </div>
          )}
        </div>
        
        <Card.Body className="d-flex flex-column">
          <div className="mb-2">
            <Badge 
              bg="light" 
              text="dark" 
              className="text-capitalize mb-2"
            >
              {product.category.replace('-', ' ')}
            </Badge>
          </div>
          
          <Card.Title className="h6 mb-2" style={{ color: 'var(--earth-dark)' }}>
            {product.name}
          </Card.Title>
          
          <Card.Text className="flex-grow-1 small text-muted mb-3">
            {product.description.length > 100 
              ? `${product.description.substring(0, 100)}...` 
              : product.description
            }
          </Card.Text>

          <div className="mb-3">
            <small className="text-muted">
              By <span style={{ color: 'var(--royal)' }}>{product.cooperative?.name}</span>
            </small>
          </div>
          
          <div className="d-flex justify-content-between align-items-center mt-auto">
            <div>
              <span className="h5 fw-bold mb-0" style={{ color: 'var(--primary)' }}>
                ${product.price}
              </span>
            </div>
            <Button 
              size="sm"
              style={{ 
                backgroundColor: 'var(--primary)',
                borderColor: 'var(--primary)'
              }}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );

  return (
    <Container className="py-5" style={{ marginTop: '20px' }}>
      {alert.show && (
        <Alert variant={alert.type} dismissible onClose={() => setAlert({ show: false, message: '', type: '' })}>
          {alert.message}
        </Alert>
      )}

      {/* Demo Mode Indicator */}
      {usingMockData && (
        <Alert variant="info" className="mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <strong>Demo Mode</strong> - Showing sample products for demonstration.
            </div>
            <Button 
              variant="outline-info" 
              size="sm"
              onClick={fetchProducts}
            >
              Retry API Connection
            </Button>
          </div>
        </Alert>
      )}

      {/* Header Section */}
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="display-5 fw-bold mb-3" style={{ color: 'var(--earth-dark)' }}>
              Moroccan Artisanal Products
            </h1>
            <p className="lead text-muted">
              Discover authentic handcrafted treasures from local cooperatives across Morocco
            </p>
          </div>
        </Col>
      </Row>

      {/* Filters and Search Section */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Row className="g-3 align-items-end">
            {/* Search */}
            <Col md={4}>
              <Form.Group>
                <Form.Label>Search Products</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search by name, description, or cooperative..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <InputGroup.Text>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Col>

            {/* Category Filter */}
            <Col md={3}>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Price Range */}
            <Col md={3}>
              <Form.Group>
                <Form.Label>
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </Form.Label>
                <Form.Range
                  min={0}
                  max={1000}
                  step={10}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                />
              </Form.Group>
            </Col>

            {/* Sort */}
            <Col md={2}>
              <Form.Group>
                <Form.Label>Sort By</Form.Label>
                <Form.Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Results Count */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <span className="text-muted">
            Showing {currentProducts.length} of {filteredProducts.length} products
          </span>
        </div>
        <div>
          {selectedCategory !== 'all' && (
            <Badge 
              bg="primary" 
              className="me-2 cursor-pointer"
              onClick={() => setSelectedCategory('all')}
            >
              {categories.find(c => c.value === selectedCategory)?.label}
              <span className="ms-2">×</span>
            </Badge>
          )}
          {searchTerm && (
            <Badge 
              bg="secondary" 
              className="cursor-pointer"
              onClick={() => setSearchTerm('')}
            >
              Search: "{searchTerm}"
              <span className="ms-2">×</span>
            </Badge>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Loading products...</p>
        </div>
      ) : currentProducts.length === 0 ? (
        <Card className="border-0 shadow-sm text-center py-5">
          <Card.Body>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted mb-3">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
              <line x1="7" y1="7" x2="7.01" y2="7"></line>
            </svg>
            <h5 className="text-muted">No products found</h5>
            <p className="text-muted mb-0">
              Try adjusting your search criteria or browse all categories.
            </p>
          </Card.Body>
        </Card>
      ) : (
        <>
          <Row>
            {currentProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </Row>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination>
                <Pagination.Prev 
                  disabled={currentPage === 1}
                  onClick={() => paginate(currentPage - 1)}
                />
                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next 
                  disabled={currentPage === totalPages}
                  onClick={() => paginate(currentPage + 1)}
                />
              </Pagination>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default Products;