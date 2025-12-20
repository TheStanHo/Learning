import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getTopicContent, getAllTopics, getTopics } from '@/lib/content';
import { MDXComponents } from '@/components/MDXComponents';
import Breadcrumbs from '@/components/Breadcrumbs';
import TopicNavigation from '@/components/TopicNavigation';
import TableOfContents from '@/components/TableOfContents';
import RelatedTopics from '@/components/RelatedTopics';
import ViewTracker from '@/components/ViewTracker';
import StructuredData from '@/components/StructuredData';
import { calculateReadingTime } from '@/lib/utils';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface PageProps {
  params: Promise<{
    category: string;
    topic: string;
  }>;
}

export async function generateStaticParams() {
  const topics = await getAllTopics();
  return topics.map((topic) => ({
    category: topic.category,
    topic: topic.name,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { category, topic } = await params;
  const { metadata } = await getTopicContent(category, topic);

  if (!metadata) {
    return {
      title: topic,
    };
  }

  return {
    title: metadata.title,
    description: metadata.description || `Learn about ${metadata.title}`,
    openGraph: {
      title: metadata.title,
      description: metadata.description || `Learn about ${metadata.title}`,
      type: "article",
      tags: metadata.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description || `Learn about ${metadata.title}`,
    },
  };
}

export default async function TopicPage({ params }: PageProps) {
  const { category, topic } = await params;
  const { content, metadata } = await getTopicContent(category, topic);

  if (!content) {
    notFound();
  }

  const readingTime = calculateReadingTime(content);

  // Get all topics in the category for navigation
  const categoryTopics = await getTopics(category);
  const currentIndex = categoryTopics.findIndex(t => t.name === topic);
  
  const prevTopic = currentIndex > 0 ? {
    name: categoryTopics[currentIndex - 1].name,
    title: categoryTopics[currentIndex - 1].metadata?.title || categoryTopics[currentIndex - 1].name,
    category: categoryTopics[currentIndex - 1].category,
  } : null;

  const nextTopic = currentIndex < categoryTopics.length - 1 ? {
    name: categoryTopics[currentIndex + 1].name,
    title: categoryTopics[currentIndex + 1].metadata?.title || categoryTopics[currentIndex + 1].name,
    category: categoryTopics[currentIndex + 1].category,
  } : null;

  // Get all topics for related topics
  const allTopics = await getAllTopics();

  // Prepare structured data
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://learning.stanho.dev';
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Topics', url: '/topics' },
    { name: category.charAt(0).toUpperCase() + category.slice(1), url: `/topics#${category}` },
    { name: metadata?.title || topic, url: `/topics/${category}/${topic}` },
  ];

  return (
    <>
      {/* Structured Data for SEO */}
      {metadata && (
        <>
          <StructuredData
            type="article"
            articleData={{
              title: metadata.title,
              description: metadata.description,
              category,
              topic,
              tags: metadata.tags,
              baseUrl,
            }}
          />
          <StructuredData
            type="breadcrumb"
            breadcrumbData={{
              items: breadcrumbItems,
              baseUrl,
            }}
          />
        </>
      )}
      <div className="max-w-7xl mx-auto">
      <article className="max-w-4xl mx-auto lg:mr-[22rem] lg:pr-6 xl:mr-[24rem] xl:pr-8">
        <Breadcrumbs
          category={category}
          topic={topic}
          topicTitle={metadata?.title}
        />
        {metadata && (
          <header className="mb-12 pb-8 border-b border-gray-300 dark:border-gray-800">
            <div className="mb-4 flex items-center gap-3 flex-wrap">
              <span className="inline-block px-3 py-1 bg-blue-500/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium border border-blue-500/20 dark:border-blue-500/20">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{readingTime} {readingTime === 1 ? 'minute' : 'minutes'} read</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-gray-900 dark:text-gray-100">{metadata.title}</h1>
            {metadata.description && (
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{metadata.description}</p>
            )}
            {metadata.tags && metadata.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {metadata.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>
        )}
        <div className="prose dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-blue-700 dark:prose-code:text-blue-300 prose-code:bg-gray-200 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-300 dark:prose-pre:border-gray-800 overflow-x-hidden">
          <MDXRemote
            source={content}
            components={MDXComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeHighlight],
              },
            }}
          />
        </div>
        <TopicNavigation prevTopic={prevTopic} nextTopic={nextTopic} />
        <RelatedTopics
          currentTopic={topic}
          currentCategory={category}
          allTopics={allTopics}
        />
      </article>
      <aside className="hidden lg:block fixed right-4 xl:right-8 top-24 w-64 z-10">
        <TableOfContents content={content} />
      </aside>
      <ViewTracker
        category={category}
        topic={topic}
        title={metadata?.title || topic}
      />
    </div>
    </>
  );
}

