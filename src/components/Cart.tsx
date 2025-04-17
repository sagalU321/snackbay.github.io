
import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeItem } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-xl font-semibold text-food-dark mb-4">Your Cart</h2>
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <h2 className="text-xl font-semibold text-food-dark p-4 border-b">Your Cart</h2>
      
      <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
        {cart.items.map((item) => (
          <div key={item.id} className="flex items-center border-b pb-4">
            <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
              <img 
                src={item.image} 
                alt={item.name} 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="ml-4 flex-grow">
              <h3 className="text-sm font-medium text-food-dark">{item.name}</h3>
              <p className="text-food-primary font-semibold">₹{item.price}</p>
            </div>
            <div className="flex items-center">
              <button 
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="p-1 rounded-full hover:bg-gray-100"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="mx-2 w-6 text-center">{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 rounded-full hover:bg-gray-100"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
              <button 
                onClick={() => removeItem(item.id)}
                className="ml-4 p-1 text-red-500 hover:bg-red-50 rounded-full"
                aria-label="Remove item"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-gray-50">
        <div className="flex justify-between items-center py-2 font-medium">
          <span>Subtotal</span>
          <span>₹{cart.total}</span>
        </div>
        <div className="flex justify-between items-center py-2 text-sm text-gray-600">
          <span>Delivery Fee</span>
          <span>₹40</span>
        </div>
        <div className="flex justify-between items-center py-2 font-bold text-lg border-t mt-2">
          <span>Total</span>
          <span>₹{cart.total + 40}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
