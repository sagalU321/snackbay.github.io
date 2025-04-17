
import React from 'react';
import { Plus } from 'lucide-react';
import { MenuItem } from '@/data/menuData';
import { useCart } from '@/context/CartContext';

interface FoodCardProps {
  item: MenuItem;
}

const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  const { addItem } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="h-48 w-full overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-food-dark">{item.name}</h3>
          {item.isVegetarian ? (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Veg</span>
          ) : (
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Non-Veg</span>
          )}
        </div>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{item.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-food-dark font-semibold">₹{item.price}</span>
          <button 
            onClick={() => addItem(item)}
            className="bg-food-primary text-white rounded-full p-2 hover:bg-food-secondary transition-colors"
            aria-label="Add to cart"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
