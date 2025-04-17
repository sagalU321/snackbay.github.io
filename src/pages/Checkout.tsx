
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Cart from '@/components/Cart';
import RazorpayCheckout from '@/components/RazorpayCheckout';
import { useCart } from '@/context/CartContext';

const Checkout = () => {
  const { cart } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!customerInfo.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!customerInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!customerInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(customerInfo.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Phone number should be 10 digits';
    }
    
    if (!customerInfo.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-food-dark mb-6">Checkout</h1>
        
        {cart.items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-food-dark mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some delicious items to your cart and come back!</p>
            <a 
              href="/menu" 
              className="bg-food-primary hover:bg-food-secondary text-white font-medium py-2 px-6 rounded-full transition-colors inline-block"
            >
              Browse Menu
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Customer Information */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-food-dark mb-4">Delivery Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-food-primary ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-food-primary ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-food-primary ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="9876543210"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={customerInfo.address}
                      onChange={handleChange}
                      rows={3}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-food-primary ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your full delivery address"
                    />
                    {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                  </div>
                </div>
              </div>
              
              {/* Payment Section */}
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h2 className="text-xl font-semibold text-food-dark mb-4">Payment</h2>
                <p className="text-gray-600 mb-4">
                  Secure payment powered by Razorpay. Your payment information is never stored.
                </p>
                
                <RazorpayCheckout 
                  customerInfo={customerInfo} 
                />
                
                <div className="flex items-center mt-4 p-3 bg-gray-50 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs text-gray-500">
                    By clicking "Pay" button, you agree to our terms and conditions and will proceed to Razorpay's secure payment page.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <Cart />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
