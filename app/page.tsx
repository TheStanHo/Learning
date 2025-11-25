import Link from "next/link";
import { getAllCategoriesWithTopics } from "@/lib/content";

export default async function Home() {
  const categories = await getAllCategoriesWithTopics();
  const totalTopics = categories.reduce((sum, cat) => sum + cat.topics.length, 0);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="relative max-w-6xl mx-auto px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              Welcome to Learning Resources
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              Your gateway to concise, high-level overviews of technical topics. 
              Start your learning journey with structured, easy-to-digest content.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Explore topics across multiple categories, complete with videos, infographics, and audio content 
              generated using NotebookLM by Google to enhance your understanding.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/topics"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
              >
                Browse All Topics
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/topics"
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-200 font-semibold rounded-lg transition-all duration-200 border border-gray-300 dark:border-gray-700"
              >
                Explore Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{categories.length}</div>
            <div className="text-gray-600 dark:text-gray-400">Categories</div>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{totalTopics}</div>
            <div className="text-gray-600 dark:text-gray-400">Topics</div>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">100%</div>
            <div className="text-gray-600 dark:text-gray-400">Free Resources</div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      {categories.length > 0 && (
        <section className="max-w-6xl mx-auto px-8 py-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Explore by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(0, 6).map((category) => (
              <Link
                key={category.name}
                href={`/topics#${category.name}`}
                className="group p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold capitalize text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {category.name}
                  </h3>
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {category.topics.length} {category.topics.length === 1 ? 'topic' : 'topics'} available
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

