import Link from 'next/link';
import { getAllCategoriesWithTopics } from '@/lib/content';
import CategoryFilter from '@/components/CategoryFilter';

export default async function TopicsPage() {
  const categories = await getAllCategoriesWithTopics();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-4xl font-bold">All Topics</h1>
        <CategoryFilter categories={categories} />
      </div>
      {categories.length === 0 ? (
        <p className="text-gray-400">No topics available yet.</p>
      ) : (
        <div className="space-y-12">
          {categories.map((category) => (
            <section key={category.name} id={category.name} className="category-section">
              <h2 className="text-3xl font-bold mb-6 capitalize flex items-center gap-3">
                <span className="w-1 h-8 bg-blue-500 rounded-full"></span>
                {category.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.topics.map((topic) => (
                  <Link
                    key={topic.name}
                    href={`/topics/${category.name}/${topic.name}`}
                    prefetch={true}
                    className="group p-6 bg-gray-900 rounded-lg border border-gray-800 hover:border-blue-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1"
                  >
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                      {topic.metadata?.title || topic.name}
                    </h3>
                    {topic.metadata?.description && (
                      <p className="text-gray-400 text-sm leading-relaxed mb-3 line-clamp-2">
                        {topic.metadata.description}
                      </p>
                    )}
                    {topic.metadata?.tags && topic.metadata.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {topic.metadata.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-800 text-xs rounded-md text-gray-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-4 flex items-center text-blue-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      Read more
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

