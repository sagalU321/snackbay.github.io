
import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '@/data/menuData';

interface CategoryListProps {
  categories: Category[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link 
          key={category.id} 
          to={`/menu?category=${category.id}`}
          className="group"
        >
          <div className="relative rounded-lg overflow-hidden h-32 shadow-md">
            <img 
              src={category.image} 
              alt={category.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="text-white font-medium text-lg text-center">
                {category.name}
              </h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
