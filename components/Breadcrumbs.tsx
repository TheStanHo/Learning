'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbsProps {
  category?: string;
  topic?: string;
  topicTitle?: string;
}

export default function Breadcrumbs({ category, topic, topicTitle }: BreadcrumbsProps) {
  const pathname = usePathname();

  const breadcrumbs = [
    { name: 'Home', href: '/' },
  ];

  if (pathname.startsWith('/topics')) {
    breadcrumbs.push({ name: 'Topics', href: '/topics' });
  }

  if (category) {
    breadcrumbs.push({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      href: `/topics#${category}`,
    });
  }

  if (topic && topicTitle) {
    breadcrumbs.push({
      name: topicTitle,
      href: `/topics/${category}/${topic}`,
    });
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <li key={crumb.href} className="flex items-center">
              {index > 0 && (
                <svg
                  className="w-4 h-4 mx-2 text-gray-500 dark:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
              {isLast ? (
                <span className="text-gray-700 dark:text-gray-300 font-medium" aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

