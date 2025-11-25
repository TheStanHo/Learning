import Link from 'next/link';
import { getAllCategoriesWithTopics } from '@/lib/content';

export default async function NotFound() {
  const categories = await getAllCategoriesWithTopics();
  const allTopics = categories.flatMap(cat => 
    cat.topics.map(topic => ({
      ...topic,
      category: cat.name,
    }))
  ).slice(0, 6); // Show up to 6 suggested topics

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-8xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or the URL might be incorrect.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go Home
          </Link>
          <Link
            href="/topics"
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-lg transition-all duration-200 border border-gray-700"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Browse Topics
          </Link>
        </div>
      </div>

      {allTopics.length > 0 && (
        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-6 text-center">Popular Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allTopics.map((topic) => (
              <Link
                key={`${topic.category}-${topic.name}`}
                href={`/topics/${topic.category}/${topic.name}`}
                className="p-4 bg-gray-900 border border-gray-800 rounded-lg hover:border-blue-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1"
              >
                <div className="text-xs text-blue-400 mb-2 uppercase">
                  {topic.category}
                </div>
                <h4 className="text-lg font-semibold mb-2 hover:text-blue-400 transition-colors">
                  {topic.metadata?.title || topic.name}
                </h4>
                {topic.metadata?.description && (
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {topic.metadata.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 p-6 bg-gray-900 border border-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">What can you do?</h3>
        <ul className="space-y-2 text-gray-400">
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Check the URL for typos or errors</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Use the sidebar navigation to find content</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Browse all topics from the topics page</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Return to the homepage to start fresh</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

