
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import CategoryList from '@/components/CategoryList';
import FoodCard from '@/components/FoodCard';
import { categories, getFeaturedItems } from '@/data/menuData';

const Index = () => {
  const featuredItems = getFeaturedItems();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-food-dark">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80" 
            alt="Delicious food" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Delicious Food <span className="text-food-primary">Delivered</span> To Your Door
          </h1>
          <p className="text-lg text-white mb-8 max-w-2xl">
            Order your favorite meals online and have them delivered in minutes. Fresh, tasty, and ready to enjoy!
          </p>
          <Link 
            to="/menu" 
            className="bg-food-primary hover:bg-food-secondary text-white font-medium py-3 px-8 rounded-full transition-colors"
          >
            Order Now
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold text-food-dark mb-6">Explore Categories</h2>
        <CategoryList categories={categories} />
      </div>

      {/* Featured Items Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-food-dark">Featured Items</h2>
          <Link 
            to="/menu" 
            className="text-food-primary hover:text-food-secondary font-medium transition-colors"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredItems.map(item => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-food-dark mb-8 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg transition-transform hover:-translate-y-2 duration-300">
              <div className="bg-food-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-food-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-food-dark mb-2">Fast Delivery</h3>
              <p className="text-gray-600">We deliver your food while it's still hot and fresh, right to your doorstep.</p>
            </div>
            <div className="text-center p-6 rounded-lg transition-transform hover:-translate-y-2 duration-300">
              <div className="bg-food-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-food-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-food-dark mb-2">Quality Food</h3>
              <p className="text-gray-600">Made with premium ingredients, our food maintains the highest standards of quality.</p>
            </div>
            <div className="text-center p-6 rounded-lg transition-transform hover:-translate-y-2 duration-300">
              <div className="bg-food-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-food-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-food-dark mb-2">Secure Payment</h3>
              <p className="text-gray-600">All payments are processed securely through Razorpay payment gateway.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-food-dark text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-4">
                <span className="text-food-primary">Tasty</span>Eats
              </h3>
              <p className="text-gray-300 max-w-xs">
                Order delicious food online and have it delivered to your door in minutes.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-gray-300 hover:text-food-primary transition-colors">Home</Link></li>
                  <li><Link to="/menu" className="text-gray-300 hover:text-food-primary transition-colors">Menu</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                <p className="text-gray-300">
                  Email: info@tastyeats.com<br />
                  Phone: +91 9876543210
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} TastyEats. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
