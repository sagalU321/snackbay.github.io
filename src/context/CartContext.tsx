
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { MenuItem } from '@/data/menuData';

// Define cart item type
export interface CartItem extends MenuItem {
  quantity: number;
}

// Define cart state
interface CartState {
  items: CartItem[];
  total: number;
}

// Define actions
type CartAction =
  | { type: 'ADD_ITEM'; payload: MenuItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

// Initial state
const initialState: CartState = {
  items: [],
  total: 0,
};

// Calculate total
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

// Reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      } else {
        // New item, add to cart
        const newItems = [
          ...state.items,
          { ...action.payload, quantity: 1 },
        ];
        return {
          ...state,
          items: newItems,
          total: calculateTotal(newItems),
        };
      }
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter((item) => item.id !== action.payload);
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        // If quantity is zero or negative, remove the item
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: id });
      }
      
      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

// Create context
interface CartContextProps {
  cart: CartState;
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

// Create provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item: MenuItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
