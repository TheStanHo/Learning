interface StructuredDataProps {
  type: 'article' | 'breadcrumb';
  articleData?: {
    title: string;
    description?: string;
    category: string;
    topic: string;
    publishedTime?: string;
    modifiedTime?: string;
    tags?: string[];
    author?: string;
    baseUrl: string;
  };
  breadcrumbData?: {
    items: Array<{
      name: string;
      url: string;
    }>;
    baseUrl: string;
  };
}

export default function StructuredData({ type, articleData, breadcrumbData }: StructuredDataProps) {
  if (type === 'article' && articleData) {
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: articleData.title,
      description: articleData.description || articleData.title,
      image: `${articleData.baseUrl}/favicon.png`,
      datePublished: articleData.publishedTime || new Date().toISOString(),
      dateModified: articleData.modifiedTime || articleData.publishedTime || new Date().toISOString(),
      author: {
        '@type': 'Organization',
        name: articleData.author || 'Learning Resources',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Learning Resources',
        logo: {
          '@type': 'ImageObject',
          url: `${articleData.baseUrl}/favicon.png`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${articleData.baseUrl}/topics/${articleData.category}/${articleData.topic}`,
      },
      articleSection: articleData.category,
      keywords: articleData.tags?.join(', ') || articleData.category,
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    );
  }

  if (type === 'breadcrumb' && breadcrumbData) {
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbData.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${breadcrumbData.baseUrl}${item.url}`,
      })),
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    );
  }

  return null;
}

