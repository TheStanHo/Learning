'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Category } from '@/types/content';

interface SearchProps {
  categories: Category[];
}

export default function Search({ categories }: SearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const allTopics = useMemo(() => {
    return categories.flatMap((category) =>
      category.topics.map((topic) => ({
        ...topic,
        categoryName: category.name,
      }))
    );
  }, [categories]);

  const filteredTopics = useMemo(() => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    return allTopics.filter(
      (topic) =>
        topic.metadata?.title?.toLowerCase().includes(lowerQuery) ||
        topic.name.toLowerCase().includes(lowerQuery) ||
        topic.metadata?.description?.toLowerCase().includes(lowerQuery) ||
        topic.metadata?.tags?.some((tag) =>
          tag.toLowerCase().includes(lowerQuery)
        )
    );
  }, [query, allTopics]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        const input = document.getElementById('search-input') as HTMLInputElement;
        input?.focus();
      }
      
      if (e.key === 'Escape') {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
      
      if (isOpen && filteredTopics.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setFocusedIndex((prev) =>
            prev < filteredTopics.length - 1 ? prev + 1 : prev
          );
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        } else if (e.key === 'Enter' && focusedIndex >= 0) {
          e.preventDefault();
          const topic = filteredTopics[focusedIndex];
          window.location.href = `/topics/${topic.categoryName}/${topic.name}`;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredTopics, focusedIndex]);

  const handleTopicClick = () => {
    setIsOpen(false);
    setQuery('');
    setFocusedIndex(-1);
  };

  return (
    <div className="relative flex-1 max-w-md">
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
        aria-label="Search topics"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden sm:inline px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">
          Ctrl+K
        </kbd>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl z-50 max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="relative">
                <input
                  id="search-input"
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setFocusedIndex(-1);
                  }}
                  placeholder="Search topics..."
                  className="w-full px-4 py-2 pl-10 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="overflow-y-auto">
              {query.trim() && filteredTopics.length === 0 ? (
                <div className="p-8 text-center text-gray-600 dark:text-gray-400">
                  No topics found matching &quot;{query}&quot;
                </div>
              ) : filteredTopics.length > 0 ? (
                <ul className="py-2">
                  {filteredTopics.map((topic, index) => (
                    <li key={`${topic.categoryName}-${topic.name}`}>
                      <Link
                        href={`/topics/${topic.categoryName}/${topic.name}`}
                        onClick={handleTopicClick}
                        className={`block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                          index === focusedIndex ? 'bg-gray-100 dark:bg-gray-800' : ''
                        }`}
                      >
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {topic.metadata?.title || topic.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {topic.categoryName.charAt(0).toUpperCase() +
                            topic.categoryName.slice(1)}
                        </div>
                        {topic.metadata?.description && (
                          <div className="text-sm text-gray-500 dark:text-gray-500 mt-1 line-clamp-1">
                            {topic.metadata.description}
                          </div>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-8 text-center text-gray-600 dark:text-gray-400">
                  Start typing to search topics...
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

