'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Category } from '@/types/content';

interface SidebarProps {
  categories: Category[];
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ categories, isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Expand categories that contain the current path
    const currentCategory = pathname.split('/')[2];
    if (currentCategory) {
      setExpandedCategories(new Set([currentCategory]));
    }
  }, [pathname]);

  const toggleCategory = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName);
    } else {
      newExpanded.add(categoryName);
    }
    setExpandedCategories(newExpanded);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <aside className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-40 overflow-y-auto shadow-xl transition-transform duration-300 no-print ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } md:translate-x-0`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <Link href="/" className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          Learning Resources
        </Link>
        <button
          onClick={onToggle}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
          aria-label="Close sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav className="p-4">
        {categories.length === 0 ? (
          <div className="text-gray-600 dark:text-gray-400">No categories found</div>
        ) : (
          <ul className="space-y-1">
            {categories.map((category) => (
              <li key={category.name}>
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-between transition-all duration-200 group"
                >
                  <span className="font-semibold capitalize text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                    {category.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600 dark:text-gray-500 bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                      {category.topics.length}
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 text-gray-600 dark:text-gray-500 ${
                        expandedCategories.has(category.name) ? 'rotate-90 text-blue-600 dark:text-blue-400' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
                {expandedCategories.has(category.name) && (
                  <ul className="ml-2 mt-1 space-y-0.5 border-l-2 border-gray-300 dark:border-gray-800 pl-2 animate-in fade-in duration-200">
                    {category.topics.map((topic) => {
                      const topicPath = `/topics/${category.name}/${topic.name}`;
                      const isActive = pathname === topicPath;
                      return (
                        <li key={topic.name}>
                          <Link
                            href={topicPath}
                            prefetch={true}
                            className={`block px-3 py-2 rounded-lg transition-all duration-200 min-h-[44px] flex items-center ${
                              isActive
                                ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-l-2 border-blue-500 -ml-2 pl-3 font-medium'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                            }`}
                          >
                            {topic.metadata?.title || topic.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </nav>
    </aside>
  );
}

