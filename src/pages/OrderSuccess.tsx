
import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { CheckCircle } from 'lucide-react';

const OrderSuccess = () => {
  const location = useLocation();
  const { orderId, paymentId, amount } = location.state || {};

  // Redirect if accessed directly without order details
  if (!orderId) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-food-primary p-6 text-center">
            <CheckCircle className="h-16 w-16 text-white mx-auto mb-2" />
            <h1 className="text-2xl font-bold text-white">Order Successful!</h1>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <p className="text-gray-600 mb-1">Order ID:</p>
              <p className="font-semibold text-food-dark">{orderId}</p>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-1">Payment ID:</p>
              <p className="font-semibold text-food-dark">{paymentId}</p>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-1">Amount Paid:</p>
              <p className="font-semibold text-food-dark">₹{amount}</p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
              <p className="text-green-800 text-sm">
                We've sent an order confirmation email with details of your order. Your food is being prepared and will be delivered soon!
              </p>
            </div>
            
            <div className="flex flex-col space-y-3">
              <Link 
                to="/"
                className="bg-food-primary hover:bg-food-secondary text-white font-medium py-2 px-4 rounded-md transition-colors text-center"
              >
                Back to Home
              </Link>
              
              <Link 
                to="/menu"
                className="border border-food-primary text-food-primary hover:bg-food-primary/5 font-medium py-2 px-4 rounded-md transition-colors text-center"
              >
                Order Something Else
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
