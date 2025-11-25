import Link from 'next/link';
import { Topic } from '@/types/content';

interface RelatedTopicsProps {
  currentTopic: string;
  currentCategory: string;
  allTopics: Topic[];
  limit?: number;
}

export default function RelatedTopics({ 
  currentTopic, 
  currentCategory, 
  allTopics,
  limit = 3 
}: RelatedTopicsProps) {
  // Filter out current topic and get topics from same category
  const related = allTopics
    .filter(
      (topic) =>
        topic.category === currentCategory && topic.name !== currentTopic
    )
    .slice(0, limit);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Related Topics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {related.map((topic) => (
          <Link
            key={topic.name}
            href={`/topics/${topic.category}/${topic.name}`}
            prefetch={true}
            className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 min-h-[44px] flex flex-col justify-center"
          >
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {topic.metadata?.title || topic.name}
            </h3>
            {topic.metadata?.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {topic.metadata.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}

