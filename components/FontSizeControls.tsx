'use client';

import { useEffect, useState } from 'react';

export default function FontSizeControls() {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  useEffect(() => {
    const stored = localStorage.getItem('fontSize') as 'normal' | 'large' | 'xlarge' | null;
    if (stored) {
      setFontSize(stored);
      applyFontSize(stored);
    }
  }, []);

  const applyFontSize = (size: 'normal' | 'large' | 'xlarge') => {
    const root = document.documentElement;
    root.classList.remove('font-normal', 'font-large', 'font-xlarge');
    root.classList.add(`font-${size}`);
    
    // Apply to article content
    const article = document.querySelector('article');
    if (article) {
      article.classList.remove('text-base', 'text-lg', 'text-xl');
      if (size === 'normal') {
        article.classList.add('text-base');
      } else if (size === 'large') {
        article.classList.add('text-lg');
      } else {
        article.classList.add('text-xl');
      }
    }
  };

  const handleFontSizeChange = (size: 'normal' | 'large' | 'xlarge') => {
    setFontSize(size);
    localStorage.setItem('fontSize', size);
    applyFontSize(size);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-400">Font Size:</span>
      <div className="flex gap-1 bg-gray-800 rounded-lg p-1">
        <button
          onClick={() => handleFontSizeChange('normal')}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            fontSize === 'normal'
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
          aria-label="Normal font size"
        >
          A
        </button>
        <button
          onClick={() => handleFontSizeChange('large')}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            fontSize === 'large'
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
          aria-label="Large font size"
        >
          A
        </button>
        <button
          onClick={() => handleFontSizeChange('xlarge')}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            fontSize === 'xlarge'
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
          aria-label="Extra large font size"
        >
          A
        </button>
      </div>
    </div>
  );
}

