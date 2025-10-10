// PRODUCTS MOCK DATA
export const mockProducts = [
  {
    _id: '1',
    name: 'Premium Argan Oil',
    price: 29.99,
    stock: 45,
    status: 'active',
    category: 'cosmetics',
    description: '100% pure organic argan oil from Souss region. Rich in vitamin E and antioxidants for healthy skin and hair.',
    images: ['/placeholder.jpg'],
    cooperative: { 
      name: 'Souss Women Cooperative',
      logo: '/placeholder.jpg'
    },
    rating: { average: 4.5, count: 156 },
    createdAt: '2024-01-15',
    specifications: {
      weight: '100ml',
      ingredients: ['100% Pure Argan Oil'],
      usageInstructions: 'Apply to skin or hair daily'
    }
  },
  {
    _id: '2',
    name: 'Handwoven Berber Rug',
    price: 199.99,
    stock: 8,
    status: 'active',
    category: 'clothing',
    description: 'Traditional Berber rug with authentic geometric patterns. Handcrafted by skilled artisans using ancient weaving techniques.',
    images: ['/placeholder.jpg'],
    cooperative: { 
      name: 'Atlas Mountains Weavers',
      logo: '/placeholder.jpg'
    },
    rating: { average: 4.8, count: 23 },
    createdAt: '2024-01-14',
    specifications: {
      dimensions: '120x180 cm',
      material: '100% Wool',
      careInstructions: 'Dry clean only'
    }
  },
  {
    _id: '3',
    name: 'Moroccan Spice Box',
    price: 39.99,
    stock: 0,
    status: 'out-of-stock',
    category: 'edible-goods',
    description: 'Curated selection of authentic Moroccan spices including ras el hanout, saffron, and cumin. Perfect for traditional cooking.',
    images: ['/placeholder.jpg'],
    cooperative: { 
      name: 'Marrakech Spice Masters',
      logo: '/placeholder.jpg'
    },
    rating: { average: 4.6, count: 89 },
    createdAt: '2024-01-13',
    specifications: {
      weight: '250g',
      ingredients: ['Ras el Hanout', 'Saffron', 'Cumin', 'Paprika'],
      storage: 'Keep in cool, dry place'
    }
  },
  {
    _id: '4',
    name: 'Ceramic Tagine Pot',
    price: 49.99,
    stock: 25,
    status: 'active',
    category: 'accessories',
    description: 'Traditional clay tagine for authentic Moroccan cooking. Perfect for slow-cooked dishes that retain moisture and flavor.',
    images: ['/placeholder.jpg'],
    cooperative: { 
      name: 'Fes Pottery Artisans',
      logo: '/placeholder.jpg'
    },
    rating: { average: 4.7, count: 34 },
    createdAt: '2024-01-12',
    specifications: {
      capacity: '2.5L',
      material: 'Clay',
      careInstructions: 'Hand wash only'
    }
  },
  {
    _id: '5',
    name: 'Leather Babouche',
    price: 35.99,
    stock: 15,
    status: 'active',
    category: 'clothing',
    description: 'Traditional Moroccan leather slippers with intricate embroidery and comfortable fit. Handcrafted from genuine leather.',
    images: ['/placeholder.jpg'],
    cooperative: { 
      name: 'Marrakech Leather Crafts',
      logo: '/placeholder.jpg'
    },
    rating: { average: 4.4, count: 67 },
    createdAt: '2024-01-11',
    specifications: {
      sizes: ['S', 'M', 'L'],
      material: 'Genuine Leather',
      careInstructions: 'Wipe with damp cloth'
    }
  },
  {
    _id: '6',
    name: 'Souvenir Box - Classic',
    price: 79.99,
    stock: 12,
    status: 'active',
    category: 'souvenir-boxes',
    description: 'Perfect introduction to Moroccan crafts with assorted traditional items including mini argan oil, spices, and ceramic coasters.',
    images: ['/placeholder.jpg'],
    cooperative: { 
      name: 'AtlasMarket Curators',
      logo: '/placeholder.jpg'
    },
    rating: { average: 4.9, count: 45 },
    createdAt: '2024-01-10',
    specifications: {
      contents: ['Mini Argan Oil', 'Spice Samples', 'Ceramic Coasters', 'Traditional Tea'],
      weight: '1.2kg'
    }
  }
];

// ADMIN DASHBOARD MOCK DATA
export const getPlatformStats = () => ({
  totalUsers: 1247,
  totalSellers: 89,
  totalProducts: 1563,
  totalOrders: 3892,
  totalRevenue: 187450,
  activeUsers: 843,
  monthlyGrowth: 12.5,
  averageOrderValue: 48.20
});

export const getRecentActivity = () => [
  {
    id: 1,
    type: 'user_registration',
    description: 'New seller registered: Atlas Weavers Cooperative',
    user: 'Ahmed Benali',
    timestamp: '2024-01-15 14:30',
    priority: 'info'
  },
  {
    id: 2,
    type: 'order_completed',
    description: 'Large order completed: $1,247.50',
    user: 'Marie Dubois',
    timestamp: '2024-01-15 13:15',
    priority: 'success'
  },
  {
    id: 3,
    type: 'product_approval',
    description: 'Product requires approval: Premium Argan Oil Set',
    user: 'Souss Women Cooperative',
    timestamp: '2024-01-15 12:45',
    priority: 'warning'
  },
  {
    id: 4,
    type: 'system_alert',
    description: 'High traffic spike detected',
    user: 'System',
    timestamp: '2024-01-15 11:20',
    priority: 'danger'
  },
  {
    id: 5,
    type: 'user_registration',
    description: 'New buyer registered',
    user: 'John Smith',
    timestamp: '2024-01-15 10:30',
    priority: 'info'
  }
];

export const getUserDistribution = () => [
  { role: 'buyers', count: 892, percentage: 71.5, color: '#3b82f6' },
  { role: 'sellers', count: 89, percentage: 7.1, color: '#ed7418' },
  { role: 'admins', count: 3, percentage: 0.2, color: '#10b981' },
  { role: 'inactive', count: 263, percentage: 21.1, color: '#6b7280' }
];

// USER MANAGEMENT MOCK DATA
export const getMockUsers = () => [
  {
    _id: '1',
    username: 'ahmed_benali',
    email: 'ahmed.benali@email.com',
    role: 'seller',
    profile: {
      firstName: 'Ahmed',
      lastName: 'Benali',
      phone: '+212 612-345678',
      avatar: '/placeholder.jpg'
    },
    cooperative: {
      _id: 'coop1',
      name: 'Souss Women Cooperative'
    },
    isActive: true,
    createdAt: '2024-01-10',
    lastLogin: '2024-01-15 14:30'
  },
  {
    _id: '2',
    username: 'marie_dubois',
    email: 'marie.dubois@email.com',
    role: 'buyer',
    profile: {
      firstName: 'Marie',
      lastName: 'Dubois',
      phone: '+33 1 23 45 67 89',
      avatar: '/placeholder.jpg'
    },
    isActive: true,
    createdAt: '2024-01-08',
    lastLogin: '2024-01-15 13:15'
  },
  {
    _id: '3',
    username: 'admin_platform',
    email: 'admin@atlasmarket.com',
    role: 'admin',
    profile: {
      firstName: 'Platform',
      lastName: 'Admin',
      phone: '+212 522-123456',
      avatar: '/placeholder.jpg'
    },
    isActive: true,
    createdAt: '2023-12-01',
    lastLogin: '2024-01-15 12:00'
  },
  {
    _id: '4',
    username: 'fatima_zahra',
    email: 'fatima.zahra@email.com',
    role: 'seller',
    profile: {
      firstName: 'Fatima',
      lastName: 'Zahra',
      phone: '+212 678-901234',
      avatar: '/placeholder.jpg'
    },
    cooperative: {
      _id: 'coop2',
      name: 'Atlas Mountains Weavers'
    },
    isActive: false,
    createdAt: '2024-01-05',
    lastLogin: '2024-01-10 09:20'
  }
];

// PLATFORM ANALYTICS MOCK DATA
export const getRevenueData = () => [
  { month: 'Jan', revenue: 12500, orders: 245 },
  { month: 'Feb', revenue: 11800, orders: 230 },
  { month: 'Mar', revenue: 13200, orders: 255 },
  { month: 'Apr', revenue: 14500, orders: 280 },
  { month: 'May', revenue: 16200, orders: 310 },
  { month: 'Jun', revenue: 18750, orders: 365 }
];

export const getTopProducts = () => [
  { name: 'Premium Argan Oil', sales: 156, revenue: 4678.44 },
  { name: 'Moroccan Spice Box', sales: 89, revenue: 3559.11 },
  { name: 'Handwoven Berber Rug', sales: 23, revenue: 4599.77 },
  { name: 'Souvenir Box - Classic', sales: 45, revenue: 3599.55 },
  { name: 'Leather Babouche', sales: 67, revenue: 2411.33 }
];

// COOPERATIVE MANAGEMENT MOCK DATA
export const getMockCooperatives = () => [
  {
    _id: 'coop1',
    name: 'Souss Women Cooperative',
    email: 'souss.coop@email.com',
    phone: '+212 528-123456',
    address: {
      city: 'Agadir',
      country: 'Morocco'
    },
    description: 'Women-led cooperative specializing in argan oil production',
    status: 'active',
    memberCount: 45,
    productCount: 12,
    totalSales: 12450,
    joinedDate: '2023-11-15'
  },
  {
    _id: 'coop2',
    name: 'Atlas Mountains Weavers',
    email: 'atlas.weavers@email.com',
    phone: '+212 524-789012',
    address: {
      city: 'Marrakech',
      country: 'Morocco'
    },
    description: 'Traditional Berber rug weavers from the Atlas Mountains',
    status: 'active',
    memberCount: 23,
    productCount: 8,
    totalSales: 8900,
    joinedDate: '2023-12-01'
  }
];

// ORDERS MOCK DATA
export const getMockOrders = (userRole = 'buyer') => {
  const baseOrders = [
    {
      _id: '1',
      orderNumber: 'ORD-1705321200-ABC123',
      user: {
        _id: 'user1',
        profile: { firstName: 'Ahmed', lastName: 'Benali' },
        email: 'ahmed.benali@email.com'
      },
      items: [
        {
          product: {
            _id: '1',
            name: 'Premium Argan Oil',
            images: ['/placeholder.jpg'],
            category: 'cosmetics'
          },
          cooperative: {
            _id: 'coop1',
            name: 'Souss Women Cooperative',
            logo: '/placeholder.jpg'
          },
          quantity: 2,
          price: 29.99,
          subtotal: 59.98
        }
      ],
      subtotal: 59.98,
      shippingFee: 50,
      taxAmount: 5.99,
      total: 115.97,
      status: 'delivered',
      payment: {
        method: 'card',
        status: 'completed',
        paidAt: '2024-01-15T10:30:00Z'
      },
      shippingAddress: {
        firstName: 'Ahmed',
        lastName: 'Benali',
        street: '123 Main Street',
        city: 'Casablanca',
        country: 'Morocco',
        postalCode: '20000',
        phone: '+212 612-345678'
      },
      timeline: {
        placed: '2024-01-15T10:00:00Z',
        confirmed: '2024-01-15T11:00:00Z',
        processed: '2024-01-16T09:00:00Z',
        shipped: '2024-01-17T14:00:00Z',
        delivered: '2024-01-20T11:00:00Z'
      },
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      _id: '2',
      orderNumber: 'ORD-1705234800-DEF456',
      user: {
        _id: 'user2', 
        profile: { firstName: 'Marie', lastName: 'Dubois' },
        email: 'marie.dubois@email.com'
      },
      items: [
        {
          product: {
            _id: '2',
            name: 'Handwoven Berber Rug',
            images: ['/placeholder.jpg'],
            category: 'clothing'
          },
          cooperative: {
            _id: 'coop2',
            name: 'Atlas Mountains Weavers',
            logo: '/placeholder.jpg'
          },
          quantity: 1,
          price: 199.99,
          subtotal: 199.99
        },
        {
          product: {
            _id: '4',
            name: 'Ceramic Tagine Pot', 
            images: ['/placeholder.jpg'],
            category: 'accessories'
          },
          cooperative: {
            _id: 'coop3',
            name: 'Fes Pottery Artisans',
            logo: '/placeholder.jpg'
          },
          quantity: 1,
          price: 49.99,
          subtotal: 49.99
        }
      ],
      subtotal: 249.98,
      shippingFee: 0,
      taxAmount: 24.99,
      total: 274.97,
      status: 'shipped',
      payment: {
        method: 'paypal',
        status: 'completed', 
        paidAt: '2024-01-14T15:20:00Z'
      },
      shippingAddress: {
        firstName: 'Marie',
        lastName: 'Dubois',
        street: '456 Rue de Paris',
        city: 'Paris',
        country: 'France', 
        postalCode: '75001',
        phone: '+33 1 23 45 67 89'
      },
      timeline: {
        placed: '2024-01-14T15:00:00Z',
        confirmed: '2024-01-14T16:00:00Z',
        processed: '2024-01-15T10:00:00Z',
        shipped: '2024-01-16T09:00:00Z'
      },
      createdAt: '2024-01-14T15:00:00Z'
    }
  ];

  // Filter based on user role
  if (userRole === 'seller') {
    return baseOrders.filter(order => 
      order.items.some(item => item.cooperative._id === 'coop1') // Current seller's cooperative
    );
  }

  return baseOrders;
};

// COOPERATIVES MOCK DATA
export const getPublicCooperatives = () => [
  {
    _id: 'coop1',
    name: 'Souss Women Cooperative',
    description: 'Women-led cooperative specializing in authentic argan oil production from the Souss region. Empowering local women through sustainable economic opportunities.',
    logo: '/placeholder.jpg',
    coverImage: '/placeholder.jpg',
    contact: {
      email: 'souss.coop@email.com',
      phone: '+212 528-123456',
      address: {
        city: 'Agadir',
        region: 'Souss-Massa',
        country: 'Morocco'
      }
    },
    social: {
      website: 'https://souss-cooperative.com',
      facebook: 'sousscooperative',
      instagram: 'souss_cooperative'
    },
    stats: {
      memberCount: 45,
      productCount: 12,
      totalSales: 12450,
      established: 2018,
      rating: 4.8,
      reviewCount: 156
    },
    specialties: ['argan-oil', 'cosmetics', 'organic-products'],
    certifications: ['organic', 'fair-trade', 'women-owned'],
    story: 'Founded in 2018 by a group of 15 women in rural Souss, our cooperative has grown to empower 45 local women. We specialize in traditional argan oil production while maintaining sustainable practices that protect our precious argan forest.',
    featured: true,
    status: 'active',
    joinedDate: '2023-11-15'
  },
  {
    _id: 'coop2',
    name: 'Atlas Mountains Weavers',
    description: 'Traditional Berber rug weavers from the High Atlas Mountains. Preserving ancient weaving techniques passed down through generations.',
    logo: '/placeholder.jpg',
    coverImage: '/placeholder.jpg',
    contact: {
      email: 'atlas.weavers@email.com',
      phone: '+212 524-789012',
      address: {
        city: 'Marrakech',
        region: 'Marrakech-Safi',
        country: 'Morocco'
      }
    },
    social: {
      website: 'https://atlas-weavers.com',
      instagram: 'atlas_weavers'
    },
    stats: {
      memberCount: 23,
      productCount: 8,
      totalSales: 8900,
      established: 2015,
      rating: 4.9,
      reviewCount: 89
    },
    specialties: ['berber-rugs', 'textiles', 'handicrafts'],
    certifications: ['artisanal', 'cultural-heritage'],
    story: 'Our cooperative brings together master weavers from remote Atlas Mountain villages. Each rug tells a story through its unique geometric patterns, with designs that have been preserved for centuries in Berber culture.',
    featured: true,
    status: 'active',
    joinedDate: '2023-12-01'
  },
  {
    _id: 'coop3',
    name: 'Marrakech Spice Masters',
    description: 'Curators of the finest Moroccan spices and traditional spice blends. Sourcing directly from local farmers across Morocco.',
    logo: '/placeholder.jpg',
    coverImage: '/placeholder.jpg',
    contact: {
      email: 'spice.masters@email.com',
      phone: '+212 524-345678',
      address: {
        city: 'Marrakech',
        region: 'Marrakech-Safi',
        country: 'Morocco'
      }
    },
    stats: {
      memberCount: 18,
      productCount: 25,
      totalSales: 15600,
      established: 2020,
      rating: 4.7,
      reviewCount: 234
    },
    specialties: ['spices', 'tea-blends', 'edible-goods'],
    certifications: ['organic', 'direct-trade'],
    story: 'Born in the heart of Marrakech spice souk, our cooperative works directly with farmers to bring you the most authentic Moroccan spices. We specialize in traditional blends like Ras el Hanout and preserved lemons.',
    featured: false,
    status: 'active',
    joinedDate: '2024-01-10'
  },
  {
    _id: 'coop4',
    name: 'Fes Pottery Artisans',
    description: 'Master ceramic artists from Fes creating traditional Moroccan pottery, tiles, and tagine pots using ancient techniques.',
    logo: '/placeholder.jpg',
    coverImage: '/placeholder.jpg',
    contact: {
      email: 'fes.pottery@email.com',
      phone: '+212 535-901234',
      address: {
        city: 'Fes',
        region: 'Fes-Meknes',
        country: 'Morocco'
      }
    },
    stats: {
      memberCount: 32,
      productCount: 15,
      totalSales: 7800,
      established: 2012,
      rating: 4.6,
      reviewCount: 167
    },
    specialties: ['ceramics', 'pottery', 'tagine-pots'],
    certifications: ['artisanal', 'cultural-heritage'],
    story: 'For generations, our families have practiced the art of Fes pottery. Our cooperative preserves the famous blue Fes ceramic tradition while innovating with contemporary designs that honor our heritage.',
    featured: true,
    status: 'active',
    joinedDate: '2023-12-20'
  },
  {
    _id: 'coop5',
    name: 'Sahara Desert Crafts',
    description: 'Artisans from Sahara desert communities creating unique leather goods, jewelry, and decorative items inspired by desert life.',
    logo: '/placeholder.jpg',
    coverImage: '/placeholder.jpg',
    contact: {
      email: 'sahara.crafts@email.com',
      phone: '+212 528-567890',
      address: {
        city: 'Zagora',
        region: 'Drâa-Tafilalet',
        country: 'Morocco'
      }
    },
    stats: {
      memberCount: 28,
      productCount: 20,
      totalSales: 6200,
      established: 2019,
      rating: 4.5,
      reviewCount: 98
    },
    specialties: ['leather-goods', 'jewelry', 'desert-crafts'],
    certifications: ['artisanal', 'community-owned'],
    story: 'Our cooperative represents nomadic and settled communities from the Sahara region. We create authentic leather babouches, silver jewelry, and decorative items that reflect the beauty and resilience of desert life.',
    featured: false,
    status: 'active',
    joinedDate: '2024-01-05'
  }
];

export const getCooperativeSpecialties = () => [
  { value: 'argan-oil', label: 'Argan Oil', count: 1 },
  { value: 'cosmetics', label: 'Cosmetics', count: 1 },
  { value: 'berber-rugs', label: 'Berber Rugs', count: 1 },
  { value: 'textiles', label: 'Textiles', count: 2 },
  { value: 'spices', label: 'Spices', count: 1 },
  { value: 'ceramics', label: 'Ceramics', count: 1 },
  { value: 'leather-goods', label: 'Leather Goods', count: 1 },
  { value: 'jewelry', label: 'Jewelry', count: 1 }
];