import { MetadataRoute } from 'next';
import { getAllTopics, getAllCategoriesWithTopics } from '@/lib/content';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://learning-resources.com';
  
  const topics = await getAllTopics();
  const categories = await getAllCategoriesWithTopics();

  const topicUrls: MetadataRoute.Sitemap = topics.map((topic) => ({
    url: `${baseUrl}/topics/${topic.category}/${topic.name}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const categoryUrls: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/topics#${category.name}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/topics`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...categoryUrls,
    ...topicUrls,
  ];
}

