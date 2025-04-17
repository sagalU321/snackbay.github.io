
// Menu data with categories, items, and prices
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isFeatured: boolean;
  isVegetarian: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: 'starters',
    name: 'Starters',
    image: 'https://images.unsplash.com/photo-1576021182211-9ea8dced3690?auto=format&fit=crop&q=80',
  },
  {
    id: 'main-course',
    name: 'Main Course',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80',
  },
  {
    id: 'desserts',
    name: 'Desserts',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80',
  },
  {
    id: 'beverages',
    name: 'Beverages',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&q=80',
  },
];

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Paneer Tikka',
    description: 'Marinated cottage cheese grilled to perfection',
    price: 199,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80',
    category: 'starters',
    isFeatured: true,
    isVegetarian: true,
  },
  {
    id: '2',
    name: 'Chicken Biryani',
    description: 'Fragrant rice cooked with chicken and aromatic spices',
    price: 299,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80',
    category: 'main-course',
    isFeatured: true,
    isVegetarian: false,
  },
  {
    id: '3',
    name: 'Butter Naan',
    description: 'Soft bread brushed with butter',
    price: 49,
    image: 'https://images.unsplash.com/photo-1626201850113-1e0b4de43b44?auto=format&fit=crop&q=80',
    category: 'main-course',
    isFeatured: false,
    isVegetarian: true,
  },
  {
    id: '4',
    name: 'Gulab Jamun',
    description: 'Deep-fried milk solids soaked in sugar syrup',
    price: 99,
    image: 'https://images.unsplash.com/photo-1601303516354-3d3befe90480?auto=format&fit=crop&q=80',
    category: 'desserts',
    isFeatured: true,
    isVegetarian: true,
  },
  {
    id: '5',
    name: 'Mango Lassi',
    description: 'Sweet yogurt drink with mango pulp',
    price: 79,
    image: 'https://images.unsplash.com/photo-1529254479751-faefec44a3f8?auto=format&fit=crop&q=80',
    category: 'beverages',
    isFeatured: true,
    isVegetarian: true,
  },
  {
    id: '6',
    name: 'Chilli Chicken',
    description: 'Spicy chicken stir-fried with bell peppers and onions',
    price: 249,
    image: 'https://images.unsplash.com/photo-1603496987351-f84a3ba5ec85?auto=format&fit=crop&q=80',
    category: 'starters',
    isFeatured: false,
    isVegetarian: false,
  },
  {
    id: '7',
    name: 'Palak Paneer',
    description: 'Cottage cheese cubes in a spinach gravy',
    price: 229,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107aa7ad9c?auto=format&fit=crop&q=80',
    category: 'main-course',
    isFeatured: false,
    isVegetarian: true,
  },
  {
    id: '8',
    name: 'Chocolate Brownie',
    description: 'Warm chocolate brownie with vanilla ice cream',
    price: 149,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80',
    category: 'desserts',
    isFeatured: false,
    isVegetarian: true,
  },
];

// Function to get featured menu items
export const getFeaturedItems = (): MenuItem[] => {
  return menuItems.filter(item => item.isFeatured);
};

// Function to get menu items by category
export const getItemsByCategory = (categoryId: string): MenuItem[] => {
  return menuItems.filter(item => item.category === categoryId);
};

// Function to get a menu item by id
export const getItemById = (id: string): MenuItem | undefined => {
  return menuItems.find(item => item.id === id);
};
