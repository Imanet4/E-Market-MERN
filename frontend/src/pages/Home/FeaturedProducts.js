import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      // For now, we'll use mock data. Later connect to backend
      const mockProducts = [
        {
          _id: '1',
          name: 'Premium Argan Oil',
          description: '100% pure organic argan oil from Souss region',
          price: 29.99,
          images: ['/api/placeholder/300/200'],
          cooperative: { name: 'Souss Women Cooperative' }
        },
        {
          _id: '2', 
          name: 'Handwoven Berber Rug',
          description: 'Traditional Berber rug with geometric patterns',
          price: 199.99,
          images: ['/api/placeholder/300/200'],
          cooperative: { name: 'Atlas Mountains Weavers' }
        },
        {
          _id: '3',
          name: 'Moroccan Spice Box',
          description: 'Curated selection of authentic Moroccan spices',
          price: 39.99,
          images: ['/api/placeholder/300/200'],
          cooperative: { name: 'Marrakech Spice Masters' }
        },
        {
          _id: '4',
          name: 'Handmade Pottery Tagine',
          description: 'Traditional clay tagine for authentic cooking',
          price: 49.99,
          images: ['/api/placeholder/300/200'],
          cooperative: { name: 'Fes Pottery Artisans' }
        }
      ];
      
      setProducts(mockProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" style={{ color: 'var(--primary)' }} />
      </Container>
    );
  }

  return (
    <section className="py-5 bg-light">
      <Container>
        <Row className="mb-5">
          <Col className="text-center">
            <h2 className="display-5 fw-bold mb-3" style={{ color: 'var(--earth-dark)' }}>
              Featured Artisanal Products
            </h2>
            <p className="lead text-earth" style={{ color: 'var(--earth)' }}>
              Handpicked treasures from Moroccan cooperatives
            </p>
          </Col>
        </Row>

        <Row>
          {products.map((product) => (
            <Col lg={3} md={6} key={product._id} className="mb-4">
              <Card 
                className="h-100 shadow-sm product-card border-0"
                style={{ transition: 'all 0.3s ease' }}
              >
                <div 
                  className="position-relative overflow-hidden"
                  style={{ height: '200px', backgroundColor: '#f8f9fa' }}
                >
                  <Card.Img 
                    variant="top"
                    src={`https://via.placeholder.com/300x200/ED7418/FFFFFF?text=${encodeURIComponent(product.name)}`}
                    style={{ 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                    className="card-img-hover"
                  />
                  <div 
                    className="position-absolute top-0 end-0 m-2"
                    style={{ 
                      backgroundColor: 'var(--gold)',
                      color: 'var(--earth-dark)',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '0.7rem',
                      fontWeight: 'bold'
                    }}
                  >
                    Featured
                  </div>
                </div>
                
                <Card.Body className="d-flex flex-column">
                  <div className="mb-2">
                    <small 
                      className="text-muted"
                      style={{ color: 'var(--royal)' }}
                    >
                      {product.cooperative.name}
                    </small>
                  </div>
                  
                  <Card.Title 
                    className="h6 mb-2"
                    style={{ color: 'var(--earth-dark)' }}
                  >
                    {product.name}
                  </Card.Title>
                  
                  <Card.Text 
                    className="flex-grow-1 small text-earth"
                    style={{ color: 'var(--earth)' }}
                  >
                    {product.description}
                  </Card.Text>
                  
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <span 
                      className="h5 mb-0 fw-bold"
                      style={{ color: 'var(--primary)' }}
                    >
                      ${product.price}
                    </span>
                    <Button 
                      size="sm"
                      style={{ 
                        backgroundColor: 'var(--primary)',
                        borderColor: 'var(--primary)'
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row className="mt-4">
          <Col className="text-center">
            <Link to="/products">
              <Button 
                variant="outline-primary"
                size="lg"
                style={{ 
                  color: 'var(--primary)',
                  borderColor: 'var(--primary)'
                }}
              >
                View All Products →
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FeaturedProducts;