import Link from 'next/link';
import { getAllCategoriesWithTopics } from '@/lib/content';

export default async function TopicNotFound() {
  // Since we can't get params in not-found, we'll show general suggestions
  const otherCategories = await getAllCategoriesWithTopics();

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Topic Not Found
        </h1>
        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          The topic you're looking for doesn't exist or may have been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/topics"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105"
          >
            Browse All Topics
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-lg transition-all duration-200 border border-gray-700"
          >
            Go Home
          </Link>
        </div>
      </div>

      {otherCategories.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-6">Explore Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherCategories.slice(0, 6).map((cat) => (
              <Link
                key={cat.name}
                href={`/topics#${cat.name}`}
                className="p-4 bg-gray-900 border border-gray-800 rounded-lg hover:border-blue-500/50 transition-all duration-200"
              >
                <h4 className="text-lg font-semibold mb-2 capitalize hover:text-blue-400 transition-colors">
                  {cat.name}
                </h4>
                <p className="text-sm text-gray-400">
                  {cat.topics.length} {cat.topics.length === 1 ? 'topic' : 'topics'}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

