
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { 
  createOrder, 
  initializeRazorpayPayment, 
  RAZORPAY_KEY_ID, 
  verifyPayment 
} from '@/lib/razorpay';

interface RazorpayCheckoutProps {
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

const RazorpayCheckout: React.FC<RazorpayCheckoutProps> = ({ customerInfo }) => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      setPaymentError(null);

      // Calculate the final amount (including delivery fee)
      const amount = cart.total + 40; // ₹40 delivery fee

      // Create an order
      const orderId = await createOrder({
        amount: amount * 100, // Razorpay expects amount in paise
        currency: 'INR',
        receipt: `receipt_${Date.now()}`
      });

      // Configure Razorpay options
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: 'INR',
        name: 'TastyEats',
        description: 'Food Order Payment',
        order_id: orderId,
        prefill: {
          name: customerInfo.name,
          email: customerInfo.email,
          contact: customerInfo.phone,
        },
        notes: {
          address: customerInfo.address
        },
        theme: {
          color: '#FF6B35'
        },
        handler: async (response: any) => {
          try {
            // Verify the payment
            const isVerified = await verifyPayment(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature
            );

            if (isVerified) {
              // Payment successful
              clearCart();
              navigate('/order-success', { 
                state: { 
                  orderId, 
                  paymentId: response.razorpay_payment_id,
                  amount
                }
              });
            } else {
              // Payment verification failed
              setPaymentError('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            setPaymentError('An error occurred during payment verification.');
          } finally {
            setIsProcessing(false);
          }
        }
      };

      // Initialize payment
      await initializeRazorpayPayment(options);
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError('An error occurred while processing your payment. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="mt-6">
      {paymentError && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
          {paymentError}
        </div>
      )}

      <button
        onClick={handlePayment}
        disabled={isProcessing || cart.items.length === 0}
        className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors
          ${isProcessing || cart.items.length === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-food-primary hover:bg-food-secondary'
          }`}
      >
        {isProcessing ? 'Processing...' : `Pay ₹${cart.total + 40}`}
      </button>
      
      <p className="text-xs text-gray-500 mt-2 text-center">
        Powered by Razorpay | 100% secure payment
      </p>
    </div>
  );
};

export default RazorpayCheckout;
