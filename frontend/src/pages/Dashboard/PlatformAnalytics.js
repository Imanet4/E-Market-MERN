import React, { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Table, 
  Badge, 
  Form, 
  Button,
  Alert 
} from 'react-bootstrap';
import { adminAPI } from '../../services/admin';
import { 
  getRevenueData, 
  getTopProducts,
  getPlatformStats 
} from '../../utils/mockData';

const PlatformAnalytics = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [platformStats, setPlatformStats] = useState(null);
  const [timeRange, setTimeRange] = useState('6months');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      
      // Try real API first, fallback to mock data
      try {
        const [revenueResponse, productsResponse, statsResponse] = await Promise.all([
          adminAPI.getRevenueAnalytics({ range: timeRange }),
          adminAPI.getPlatformStats(),
          adminAPI.getPlatformStats()
        ]);

        if (revenueResponse.data && productsResponse.data && statsResponse.data) {
          setRevenueData(revenueResponse.data.data);
          setTopProducts(productsResponse.data.topProducts || []);
          setPlatformStats(statsResponse.data);
          setUsingMockData(false);
        } else {
          throw new Error('Incomplete data from API');
        }
      } catch (apiError) {
        console.warn('API not available, using mock data:', apiError);
        // Use mock data
        const revenue = getRevenueData();
        const products = getTopProducts();
        const stats = getPlatformStats();
        
        setRevenueData(revenue);
        setTopProducts(products);
        setPlatformStats(stats);
        setUsingMockData(true);
        setError('Connected to demo mode with sample analytics data');
        setTimeout(() => setError(''), 3000);
      }

    } catch (err) {
      setError('Failed to load analytics data');
      console.error('Analytics error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Simple bar chart component for revenue visualization
  const RevenueBarChart = ({ data }) => {
    const maxRevenue = Math.max(...data.map(item => item.revenue));
    
    return (
      <div className="revenue-chart" style={{ height: '200px' }}>
        <div className="d-flex align-items-end justify-content-between h-100 px-3">
          {data.map((item, index) => (
            <div key={index} className="d-flex flex-column align-items-center" style={{ width: `${80/data.length}%` }}>
              <div 
                className="bg-primary rounded-top"
                style={{ 
                  height: `${(item.revenue / maxRevenue) * 150}px`,
                  width: '80%',
                  minWidth: '30px'
                }}
              ></div>
              <div className="mt-2 text-center">
                <div className="small fw-semibold">${(item.revenue/1000).toFixed(1)}k</div>
                <div className="small text-muted">{item.month}</div>
                <div className="small text-muted">{item.orders} orders</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Metric card component
  const MetricCard = ({ title, value, change, changeType, subtitle }) => (
    <Card className="h-100 border-0 shadow-sm">
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h3 className="fw-bold mb-2">{value}</h3>
            <h6 className="text-muted mb-1">{title}</h6>
            <small className="text-muted">{subtitle}</small>
            {change && (
              <Badge 
                bg={changeType === 'positive' ? 'success' : 'danger'} 
                className="mt-1"
              >
                {changeType === 'positive' ? '↑' : '↓'} {change}
              </Badge>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Loading analytics data...</p>
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

      {/* Demo Mode Indicator */}
      {usingMockData && (
        <Alert variant="warning" className="mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <strong>Demo Mode</strong> - Using sample analytics data.
            </div>
            <Button 
              variant="outline-warning" 
              size="sm"
              onClick={fetchAnalyticsData}
            >
              Retry API Connection
            </Button>
          </div>
        </Alert>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-2">Platform Analytics</h2>
          <p className="text-muted mb-0">Comprehensive overview of platform performance and metrics.</p>
        </div>
        <Form.Select 
          style={{ width: 'auto' }}
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="3months">Last 3 Months</option>
          <option value="6months">Last 6 Months</option>
          <option value="1year">Last Year</option>
        </Form.Select>
      </div>

      {/* Key Metrics */}
      <Row className="g-4 mb-5">
        <Col md={3}>
          <MetricCard 
            title="Total Revenue" 
            value={`$${platformStats?.totalRevenue?.toLocaleString() || '0'}`}
            change="+18.2%"
            changeType="positive"
            subtitle="Platform lifetime"
          />
        </Col>
        <Col md={3}>
          <MetricCard 
            title="Active Users" 
            value={platformStats?.activeUsers?.toLocaleString() || '0'}
            change="+12.5%"
            changeType="positive"
            subtitle="Last 30 days"
          />
        </Col>
        <Col md={3}>
          <MetricCard 
            title="Avg Order Value" 
            value="$48.20"
            change="+5.3%"
            changeType="positive"
            subtitle="Across all orders"
          />
        </Col>
        <Col md={3}>
          <MetricCard 
            title="Conversion Rate" 
            value="3.8%"
            change="-0.2%"
            changeType="negative"
            subtitle="Visitor to buyer"
          />
        </Col>
      </Row>

      {/* Revenue Chart */}
      <Row className="g-4 mb-5">
        <Col lg={8}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white border-bottom py-4">
              <h5 className="fw-bold mb-0">Revenue Overview</h5>
            </Card.Header>
            <Card.Body>
              <RevenueBarChart data={revenueData} />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white border-bottom py-4">
              <h5 className="fw-bold mb-0">Revenue Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Current Period</span>
                  <strong className="text-success">${revenueData[revenueData.length - 1]?.revenue.toLocaleString()}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Previous Period</span>
                  <span>${revenueData[revenueData.length - 2]?.revenue.toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Growth</span>
                  <Badge bg="success">+18.2%</Badge>
                </div>
              </div>
              
              <div className="mt-4">
                <h6 className="fw-semibold mb-3">Performance Indicators</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Customer Acquisition</span>
                  <Badge bg="success">Good</Badge>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Retention Rate</span>
                  <Badge bg="warning">Average</Badge>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Revenue Growth</span>
                  <Badge bg="success">Excellent</Badge>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Top Products */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white border-bottom py-4">
              <h5 className="fw-bold mb-0">Top Performing Products</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <Table hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="border-0 ps-4 py-3">Product</th>
                    <th className="border-0 py-3">Sales</th>
                    <th className="border-0 py-3">Revenue</th>
                    <th className="border-0 pe-4 py-3">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product, index) => (
                    <tr key={index}>
                      <td className="ps-4">
                        <div className="fw-semibold">{product.name}</div>
                      </td>
                      <td>{product.sales}</td>
                      <td>${product.revenue}</td>
                      <td className="pe-4">
                        <Badge 
                          bg={
                            index < 2 ? 'success' : 
                            index < 4 ? 'warning' : 'info'
                          }
                        >
                          {index < 2 ? 'High' : index < 4 ? 'Medium' : 'Good'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* User Analytics */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white border-bottom py-4">
              <h5 className="fw-bold mb-0">User Analytics</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-4">
                <h6 className="fw-semibold mb-3">User Growth</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">New Users (30d)</span>
                  <strong>147</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Active Sessions</span>
                  <strong>892</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Returning Rate</span>
                  <Badge bg="success">68%</Badge>
                </div>
              </div>

              <div className="mt-4">
                <h6 className="fw-semibold mb-3">Geographic Distribution</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Morocco</span>
                  <strong>45%</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">France</span>
                  <strong>28%</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Other</span>
                  <strong>27%</strong>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Additional Metrics */}
      <Row className="g-4 mt-4">
        <Col md={4}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="h4 fw-bold text-primary">94%</div>
              <small className="text-muted">Platform Uptime</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="h4 fw-bold text-success">2.3m</div>
              <small className="text-muted">Page Views (30d)</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="h4 fw-bold text-warning">4.2</div>
              <small className="text-muted">Avg. Session Duration (min)</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlatformAnalytics;