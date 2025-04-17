
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import FoodCard from '@/components/FoodCard';
import { categories, menuItems, getItemsByCategory } from '@/data/menuData';

const Menu = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState<string | null>(categoryParam);
  const [filteredItems, setFilteredItems] = useState(menuItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);

  // Filter items based on category, search query, and veg filter
  useEffect(() => {
    let items = activeCategory ? getItemsByCategory(activeCategory) : menuItems;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
      );
    }

    // Apply vegetarian filter
    if (vegOnly) {
      items = items.filter(item => item.isVegetarian);
    }

    setFilteredItems(items);
  }, [activeCategory, searchQuery, vegOnly]);

  // Set active category from URL param when component mounts
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-food-dark mb-6">Our Menu</h1>
        
        {/* Search and Filter */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:w-96 mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-food-primary"
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={vegOnly} 
                  onChange={() => setVegOnly(!vegOnly)}
                  className="sr-only"
                />
                <div className={`w-10 h-5 rounded-full ${vegOnly ? 'bg-green-500' : 'bg-gray-300'} relative transition-colors duration-200 ease-in-out`}>
                  <div className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transform transition-transform duration-200 ease-in-out ${vegOnly ? 'translate-x-5' : ''}`}></div>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">Vegetarian Only</span>
              </label>
            </div>
          </div>
        </div>
        
        {/* Categories Nav */}
        <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
          <button
            onClick={() => setActiveCategory(null)}
            className={`flex-shrink-0 px-4 py-2 mr-2 rounded-full font-medium transition-colors ${
              activeCategory === null 
                ? 'bg-food-primary text-white' 
                : 'bg-white text-food-dark hover:bg-gray-100'
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex-shrink-0 px-4 py-2 mr-2 rounded-full font-medium transition-colors ${
                activeCategory === category.id 
                  ? 'bg-food-primary text-white' 
                  : 'bg-white text-food-dark hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Menu Items */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">😕</div>
            <h3 className="text-xl font-medium text-food-dark mb-2">No items found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
