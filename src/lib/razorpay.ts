
// Interface for order creation parameters
export interface CreateOrderParams {
  amount: number;
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
}

// Interface for Razorpay payment response
export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// Mock function for creating an order (in production, this would call your backend)
export const createOrder = async (params: CreateOrderParams): Promise<string> => {
  // In production, this would make an API call to your backend, which would then call Razorpay's API
  // For this demo, we'll simulate creating an order and return a fake order ID
  console.log('Creating order with params:', params);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return a mock order ID
  return 'order_' + Math.random().toString(36).substring(2, 15);
};

// Options for Razorpay checkout
export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  image?: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
}

// Load Razorpay script
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Initialize Razorpay payment
export const initializeRazorpayPayment = async (options: RazorpayOptions): Promise<void> => {
  const isLoaded = await loadRazorpayScript();
  
  if (!isLoaded) {
    alert('Razorpay SDK failed to load. Are you online?');
    return;
  }
  
  const paymentObject = new (window as any).Razorpay(options);
  paymentObject.open();
};

// Example function to handle payment verification (would be server-side in production)
export const verifyPayment = async (
  paymentId: string,
  orderId: string,
  signature: string
): Promise<boolean> => {
  // In production, this would make an API call to your backend for verification
  console.log('Verifying payment:', { paymentId, orderId, signature });
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For demo, always return success
  return true;
};

// Razorpay test API key - in production, this would be set on your server
export const RAZORPAY_KEY_ID = 'rzp_test_YourTestKeyHere';
