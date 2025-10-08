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