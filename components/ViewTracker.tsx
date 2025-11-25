'use client';

import { useEffect } from 'react';

interface ViewTrackerProps {
  category: string;
  topic: string;
  title: string;
}

export default function ViewTracker({ category, topic, title }: ViewTrackerProps) {
  useEffect(() => {
    const viewed: {
      category: string;
      topic: string;
      title: string;
      viewedAt: number;
    } = {
      category,
      topic,
      title,
      viewedAt: Date.now(),
    };

    const stored = localStorage.getItem('recentlyViewed');
    let viewedList: typeof viewed[] = [];

    if (stored) {
      try {
        viewedList = JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse recently viewed:', e);
      }
    }

    // Remove if already exists
    viewedList = viewedList.filter(
      (item) => !(item.category === category && item.topic === topic)
    );

    // Add to beginning
    viewedList.unshift(viewed);

    // Keep only last 10
    viewedList = viewedList.slice(0, 10);

    localStorage.setItem('recentlyViewed', JSON.stringify(viewedList));
  }, [category, topic, title]);

  return null;
}

