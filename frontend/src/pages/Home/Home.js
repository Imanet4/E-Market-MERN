import React from 'react';
import Hero from './Hero';
import FeaturedProducts from './FeaturedProducts';
import SouvenirTeaser from './SouvenirTeaser';

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <SouvenirTeaser />
    </div>
  );
};

export default Home;