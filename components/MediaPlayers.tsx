'use client';

import dynamic from 'next/dynamic';

// Lazy load media players for code splitting
// This is a client component wrapper to allow ssr: false
const VideoPlayer = dynamic(() => import('./VideoPlayer'), {
  ssr: false,
  loading: () => (
    <div className="w-full bg-black rounded-lg overflow-hidden relative aspect-video flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  ),
});

const AudioPlayer = dynamic(() => import('./AudioPlayer'), {
  ssr: false,
  loading: () => (
    <div className="w-full bg-gray-900 rounded-lg p-4 relative flex items-center justify-center min-h-[120px]">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  ),
});

export { VideoPlayer, AudioPlayer };

