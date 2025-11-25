'use client';

import { useState, useEffect } from 'react';
import { Category } from '@/types/content';

interface CategoryFilterProps {
  categories: Category[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const handleFilter = () => {
      const sections = document.querySelectorAll('.category-section');
      sections.forEach((section) => {
        const categoryName = section.id;
        if (selectedCategory === 'all' || categoryName === selectedCategory) {
          (section as HTMLElement).style.display = 'block';
        } else {
          (section as HTMLElement).style.display = 'none';
        }
      });
    };

    handleFilter();
  }, [selectedCategory]);

  return (
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      aria-label="Filter by category"
    >
      <option value="all">All Categories</option>
      {categories.map((category) => (
        <option key={category.name} value={category.name}>
          {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
        </option>
      ))}
    </select>
  );
}

