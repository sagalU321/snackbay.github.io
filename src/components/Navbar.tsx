
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Navbar: React.FC = () => {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md py-4 sticky top-0 z-30">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-food-dark font-bold text-2xl flex items-center">
          <span className="text-food-primary">Tasty</span>Eats
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-food-dark"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-food-dark hover:text-food-primary transition-colors">
            Home
          </Link>
          <Link to="/menu" className="text-food-dark hover:text-food-primary transition-colors">
            Menu
          </Link>
          <Link to="/checkout" className="relative">
            <ShoppingCart className="text-food-dark hover:text-food-primary transition-colors" />
            {cart.items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-food-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.items.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white shadow-md z-20 md:hidden">
            <div className="flex flex-col p-4 space-y-4">
              <Link 
                to="/" 
                className="text-food-dark hover:text-food-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/menu" 
                className="text-food-dark hover:text-food-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Menu
              </Link>
              <Link 
                to="/checkout" 
                className="text-food-dark hover:text-food-primary transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Cart
                {cart.items.length > 0 && (
                  <span className="ml-2 bg-food-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.items.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
