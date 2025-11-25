'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface ViewedTopic {
  category: string;
  topic: string;
  title: string;
  viewedAt: number;
}

export default function RecentlyViewed() {
  const [viewed, setViewed] = useState<ViewedTopic[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('recentlyViewed');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ViewedTopic[];
        // Sort by most recent and limit to 5
        const sorted = parsed
          .sort((a, b) => b.viewedAt - a.viewedAt)
          .slice(0, 5);
        setViewed(sorted);
      } catch (e) {
        console.error('Failed to parse recently viewed:', e);
      }
    }
  }, []);

  if (viewed.length === 0) {
    return null;
  }

  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold mb-4 text-gray-100">Recently Viewed</h2>
      <ul className="space-y-2">
        {viewed.map((item) => (
          <li key={`${item.category}-${item.topic}`}>
            <Link
              href={`/topics/${item.category}/${item.topic}`}
              className="block p-3 bg-gray-900 rounded-lg border border-gray-800 hover:border-blue-500/50 transition-all duration-200 hover:bg-gray-800"
            >
              <div className="font-medium text-gray-100 hover:text-blue-400 transition-colors">
                {item.title}
              </div>
              <div className="text-xs text-gray-500 mt-1 capitalize">
                {item.category}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

