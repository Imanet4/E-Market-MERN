// PRODUCTS MOCK DATA
export const mockProducts = [
  // Souss Women Cooperative Products
  {
    _id: '1',
    name: 'Premium Golden Argan Oil',
    price: 34.99,
    stock: 28,
    status: 'active',
    category: 'cosmetics',
    description: '100% pure organic argan oil cold-pressed from Souss region. Rich in vitamin E and antioxidants for radiant skin and healthy hair. Perfect for hydration and anti-aging.',
    images: ['/images/products/argan-oil.png'],
    cooperative: { 
      _id: 'coop1',
      name: 'Souss Women Cooperative',
      logo: '/images/cooperatives/SWC.png'
    },
    rating: { average: 4.8, count: 203 },
    createdAt: '2024-01-15',
    specifications: {
      weight: '100ml',
      ingredients: ['100% Pure Argan Oil'],
      usageInstructions: 'Apply 2-3 drops to face, hair, or body daily'
    }
  },
  {
    _id: '2',
    name: 'Amlou Almond Butter Spread',
    price: 18.99,
    stock: 35,
    status: 'active',
    category: 'food',
    description: 'Traditional Moroccan amlou spread made with roasted almonds, argan oil, and honey. Delicious on bread or as a healthy snack.',
    images: ['/images/products/amlou-spread.png'],
    cooperative: { 
      _id: 'coop1',
      name: 'Souss Women Cooperative',
      logo: '/images/cooperatives/SWC.png'
    },
    rating: { average: 4.6, count: 89 },
    createdAt: '2024-02-10',
    specifications: {
      weight: '200g',
      ingredients: ['Roasted Almonds', 'Argan Oil', 'Honey'],
      storage: 'Store in cool, dry place'
    }
  },

  // Atlas Mountains Weavers Products
  {
    _id: '3',
    name: 'Handwoven Berber Rug',
    price: 249.99,
    stock: 5,
    status: 'active',
    category: 'home-decor',
    description: 'Authentic Berber rug with traditional geometric patterns. Handcrafted by skilled artisans using ancient weaving techniques passed through generations.',
    images: ['/images/products/berber-rug.png'],
    cooperative: { 
      _id: 'coop2',
      name: 'Atlas Mountains Weavers',
      logo: '/images/cooperatives/AMW.png'
    },
    rating: { average: 4.9, count: 45 },
    createdAt: '2024-01-20',
    specifications: {
      dimensions: '150x200 cm',
      material: '100% Natural Wool',
      careInstructions: 'Dry clean only'
    }
  },
  {
    _id: '4',
    name: 'Colorful Woven Keychain',
    price: 12.99,
    stock: 50,
    status: 'active',
    category: 'accessories',
    description: 'Vibrant handwoven keychain featuring traditional Berber patterns. Each piece is unique and carries cultural significance.',
    images: ['/images/products/woven-keychain.png'],
    cooperative: { 
      _id: 'coop2',
      name: 'Atlas Mountains Weavers',
      logo: '/images/cooperatives/AMW.png'
    },
    rating: { average: 4.5, count: 67 },
    createdAt: '2024-02-15',
    specifications: {
      material: 'Wool Thread',
      careInstructions: 'Wipe clean with damp cloth'
    }
  },

  // Marrakech Spice Masters Products
  {
    _id: '5',
    name: 'Golden Mountain Honey',
    price: 22.99,
    stock: 25,
    status: 'active',
    category: 'food',
    description: 'Pure mountain honey collected from the Atlas Mountains. Rich flavor with natural antibacterial properties and exquisite taste.',
    images: ['/images/products/mountain-honey.png'],
    cooperative: { 
      _id: 'coop3',
      name: 'Marrakech Spice Masters',
      logo: '/images/cooperatives/MSM.png'
    },
    rating: { average: 4.7, count: 112 },
    createdAt: '2024-01-25',
    specifications: {
      weight: '500g',
      ingredients: ['100% Pure Honey'],
      storage: 'Store at room temperature'
    }
  },

  // Fes Pottery Artisans Products
  {
    _id: '6',
    name: 'Zelige Tile Coasters Set',
    price: 29.99,
    stock: 18,
    status: 'active',
    category: 'home-decor',
    description: 'Set of 4 hand-painted ceramic coasters featuring traditional Fes zelige patterns. Each coaster is a miniature work of art.',
    images: ['/images/products/tile-coasters.png'],
    cooperative: { 
      _id: 'coop4',
      name: 'Fes Pottery Artisans',
      logo: '/images/cooperatives/FPA.png'
    },
    rating: { average: 4.6, count: 78 },
    createdAt: '2024-02-05',
    specifications: {
      pieces: '4 Coasters',
      material: 'Ceramic',
      careInstructions: 'Hand wash only'
    }
  },

  // Sahara Desert Crafts Products
  {
    _id: '7',
    name: 'Berber Silver Charm Jewelry',
    price: 45.99,
    stock: 15,
    status: 'active',
    category: 'jewelry',
    description: 'Handcrafted silver jewelry with traditional Berber charms and symbols. Each piece tells a story of Sahara nomadic heritage.',
    images: ['/images/products/silver-jewelry.png'],
    cooperative: { 
      _id: 'coop5',
      name: 'Sahara Desert Crafts',
      logo: '/images/cooperatives/SDC.png'
    },
    rating: { average: 4.8, count: 91 },
    createdAt: '2024-01-30',
    specifications: {
      material: '925 Sterling Silver',
      careInstructions: 'Polish with soft cloth'
    }
  },
  {
    _id: '8',
    name: 'Embroidered Leather Bag',
    price: 89.99,
    stock: 12,
    status: 'active',
    category: 'accessories',
    description: 'Beautiful leather bag with intricate embroidery. Handcrafted using traditional techniques with genuine leather and colorful threads.',
    images: ['/images/products/leather-bag.png'],
    cooperative: { 
      _id: 'coop5',
      name: 'Sahara Desert Crafts',
      logo: '/images/cooperatives/SDC.png'
    },
    rating: { average: 4.7, count: 56 },
    createdAt: '2024-02-12',
    specifications: {
      dimensions: '25x18x8 cm',
      material: 'Genuine Leather',
      careInstructions: 'Wipe with damp cloth'
    }
  },

  // Additional Cosmetics Products
  {
    _id: '9',
    name: 'Rose Water Toner',
    price: 19.99,
    stock: 40,
    status: 'active',
    category: 'cosmetics',
    description: 'Pure rose water distilled from Damask roses. Natural toner that hydrates, refreshes, and balances skin pH. Alcohol-free and gentle.',
    images: ['/images/products/rose-water.png'],
    cooperative: { 
      _id: 'coop1',
      name: 'Souss Women Cooperative',
      logo: '/images/cooperatives/SWC.png'
    },
    rating: { average: 4.5, count: 134 },
    createdAt: '2024-02-08',
    specifications: {
      volume: '200ml',
      ingredients: ['100% Pure Rose Water'],
      usageInstructions: 'Spray on face after cleansing'
    }
  },
  {
    _id: '10',
    name: 'Moroccan Black Soap',
    price: 14.99,
    stock: 60,
    status: 'active',
    category: 'cosmetics',
    description: 'Traditional black soap made from olive oil and essential oils. Perfect for Hammam ritual, exfoliation, and deep cleansing.',
    images: ['/images/products/black-soap.png'],
    cooperative: { 
      _id: 'coop4',
      name: 'Fes Pottery Artisans',
      logo: '/images/cooperatives/FPA.png'
    },
    rating: { average: 4.4, count: 89 },
    createdAt: '2024-02-18',
    specifications: {
      weight: '250g',
      ingredients: ['Olive Oil', 'Eucalyptus Oil'],
      usageInstructions: 'Apply to damp skin and massage'
    }
  },
  {
    _id: '11',
    name: 'Rhassoul Clay Mask',
    price: 24.99,
    stock: 30,
    status: 'active',
    category: 'cosmetics',
    description: 'Mineral-rich clay from Atlas Mountains. Deep cleanses, detoxifies, and revitalizes skin. Suitable for all skin types.',
    images: ['/images/products/clay-mask.png'],
    cooperative: { 
      _id: 'coop2',
      name: 'Atlas Mountains Weavers',
      logo: '/images/cooperatives/AMW.png'
    },
    rating: { average: 4.6, count: 67 },
    createdAt: '2024-02-14',
    specifications: {
      weight: '150g',
      ingredients: ['100% Rhassoul Clay'],
      usageInstructions: 'Mix with water and apply for 10 minutes'
    }
  }
];

// SOUVENIR BOXES MOCK DATA
export const mockSouvenirBoxes = [
  {
    _id: 'box1',
    name: 'Moroccan Essentials Luxury Box',
    price: 149.99,
    stock: 8,
    status: 'active',
    category: 'premium',
    description: 'Curated luxury collection featuring our finest products. Includes argan oil, silver jewelry, ceramic coasters, and traditional spices in elegant packaging.',
    images: ['/images/products/luxury-gift-box.png'],
    contents: [
      { productId: '1', name: 'Premium Golden Argan Oil', quantity: 1 },
      { productId: '7', name: 'Berber Silver Charm Jewelry', quantity: 1 },
      { productId: '6', name: 'Zelige Tile Coasters Set', quantity: 1 },
      { productId: '5', name: 'Golden Mountain Honey', quantity: 1 }
    ],
    rating: { average: 4.9, count: 23 },
    createdAt: '2024-03-01',
    specifications: {
      weight: '2.5kg',
      dimensions: '30x20x10 cm',
      includes: '4 premium products'
    }
  },
  {
    _id: 'box2',
    name: 'Beauty Ritual Collection',
    price: 79.99,
    stock: 15,
    status: 'active',
    category: 'cosmetics',
    description: 'Complete Moroccan beauty ritual with authentic products for skin and hair care. Experience traditional Hammam at home.',
    images: ['/images/products/beauty-box.png'],
    contents: [
      { productId: '1', name: 'Premium Golden Argan Oil', quantity: 1 },
      { productId: '9', name: 'Rose Water Toner', quantity: 1 },
      { productId: '10', name: 'Moroccan Black Soap', quantity: 1 },
      { productId: '11', name: 'Rhassoul Clay Mask', quantity: 1 }
    ],
    rating: { average: 4.7, count: 45 },
    createdAt: '2024-03-05',
    specifications: {
      weight: '1.8kg',
      includes: '4 beauty products'
    }
  },
  {
    _id: 'box3',
    name: 'Artisan Crafts Discovery',
    price: 99.99,
    stock: 12,
    status: 'active',
    category: 'handicrafts',
    description: 'Discover authentic Moroccan craftsmanship with this curated selection of traditional artisan products.',
    images: ['/images/products/crafts-box.png'],
    contents: [
      { productId: '4', name: 'Colorful Woven Keychain', quantity: 2 },
      { productId: '8', name: 'Embroidered Leather Bag', quantity: 1 },
      { productId: '6', name: 'Zelige Tile Coasters Set', quantity: 1 }
    ],
    rating: { average: 4.8, count: 31 },
    createdAt: '2024-03-10',
    specifications: {
      weight: '1.5kg',
      includes: '4 artisan items'
    }
  }
];

// ENHANCED CATEGORIES FOR FILTERS
export const productCategories = [
  { value: 'all', label: 'All Categories' },
  { value: 'cosmetics', label: 'Cosmetics & Care' },
  { value: 'food', label: 'Food & Delicacies' },
  { value: 'jewelry', label: 'Jewelry' },
  { value: 'home-decor', label: 'Home Decor' },
  { value: 'accessories', label: 'Accessories' }
];

export const souvenirBoxCategories = [
  { value: 'all', label: 'All Boxes' },
  { value: 'premium', label: 'Premium Collections' },
  { value: 'cosmetics', label: 'Beauty Rituals' },
  { value: 'handicrafts', label: 'Artisan Crafts' }
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
  { name: 'Premium Golden Argan Oil', sales: 156, revenue: 4678.44 },
  { name: 'Golden Mountain Honey', sales: 89, revenue: 3559.11 },
  { name: 'Handwoven Berber Rug', sales: 23, revenue: 4599.77 },
  { name: 'Moroccan Essentials Luxury Box', sales: 45, revenue: 3599.55 },
  { name: 'Berber Silver Charm Jewelry', sales: 67, revenue: 2411.33 }
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
            name: 'Premium Golden Argan Oil',
            images: ['/images/products/argan-oil.jpg'],
            category: 'cosmetics'
          },
          cooperative: {
            _id: 'coop1',
            name: 'Souss Women Cooperative',
            logo: '/images/cooperatives/SWC.png'
          },
          quantity: 2,
          price: 34.99,
          subtotal: 69.98
        }
      ],
      subtotal: 69.98,
      shippingFee: 50,
      taxAmount: 5.99,
      total: 125.97,
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
            _id: '3',
            name: 'Handwoven Berber Rug',
            images: ['/images/products/berber-rug.jpg'],
            category: 'home-decor'
          },
          cooperative: {
            _id: 'coop2',
            name: 'Atlas Mountains Weavers',
            logo: '/images/cooperatives/AMW.png'
          },
          quantity: 1,
          price: 249.99,
          subtotal: 249.99
        },
        {
          product: {
            _id: '6',
            name: 'Zelige Tile Coasters Set', 
            images: ['/images/products/tile-coasters.jpg'],
            category: 'home-decor'
          },
          cooperative: {
            _id: 'coop4',
            name: 'Fes Pottery Artisans',
            logo: '/images/cooperatives/FPA.png'
          },
          quantity: 1,
          price: 29.99,
          subtotal: 29.99
        }
      ],
      subtotal: 279.98,
      shippingFee: 0,
      taxAmount: 24.99,
      total: 304.97,
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
    logo: '/images/cooperatives/SWC.png',
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
    logo: '/images/cooperatives/AMW.png',
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
    logo: '/images/cooperatives/MSM.png',
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
    logo: '/images/cooperatives/FPA.png',
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
    logo: '/images/cooperatives/SDC.png',
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