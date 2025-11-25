import Link from 'next/link';

interface TopicNavigationProps {
  prevTopic?: {
    name: string;
    title: string;
    category: string;
  } | null;
  nextTopic?: {
    name: string;
    title: string;
    category: string;
  } | null;
}

export default function TopicNavigation({ prevTopic, nextTopic }: TopicNavigationProps) {
  if (!prevTopic && !nextTopic) {
    return null;
  }

  return (
    <nav className="mt-16 pt-8 border-t border-gray-300 dark:border-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prevTopic ? (
          <Link
            href={`/topics/${prevTopic.category}/${prevTopic.name}`}
            prefetch={true}
            className="group p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10 min-h-[44px] flex flex-col justify-center"
          >
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Previous Topic</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {prevTopic.title}
            </h3>
          </Link>
        ) : (
          <div></div>
        )}

        {nextTopic ? (
          <Link
            href={`/topics/${nextTopic.category}/${nextTopic.name}`}
            prefetch={true}
            className="group p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10 text-right md:text-left min-h-[44px] flex flex-col justify-center"
          >
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2 justify-end md:justify-start">
              <span>Next Topic</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {nextTopic.title}
            </h3>
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    </nav>
  );
}

