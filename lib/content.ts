import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Category, Topic, ContentMetadata } from '@/types/content';

const contentDirectory = path.join(process.cwd(), 'content');

export async function getCategories(): Promise<string[]> {
  try {
    const categoriesPath = path.join(contentDirectory, 'categories');
    const entries = await fs.readdir(categoriesPath, { withFileTypes: true });
    return entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name);
  } catch (error) {
    return [];
  }
}

export async function getTopics(category: string): Promise<Topic[]> {
  try {
    const categoryPath = path.join(contentDirectory, 'categories', category);
    const entries = await fs.readdir(categoryPath, { withFileTypes: true });
    
    const topics: Topic[] = [];
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const topicPath = path.join(categoryPath, entry.name);
        const contentPath = path.join(topicPath, 'content.mdx');
        
        // Check if content.mdx exists
        let hasContent = false;
        let metadata: ContentMetadata | undefined;
        
        try {
          await fs.access(contentPath);
          hasContent = true;
          
          // Parse frontmatter from MDX file
          const content = await fs.readFile(contentPath, 'utf8');
          const parsed = matter(content);
          
          if (parsed.data && Object.keys(parsed.data).length > 0) {
            metadata = parsed.data as ContentMetadata;
            // Ensure category and topic are set
            metadata.category = metadata.category || category;
            metadata.topic = metadata.topic || entry.name;
          }
        } catch {
          // Content file doesn't exist or couldn't be parsed
        }
        
        if (hasContent) {
          topics.push({
            name: entry.name,
            category,
            contentPath: `/content/categories/${category}/${entry.name}/content.mdx`,
            metadata,
          });
        }
      }
    }
    
    return topics;
  } catch (error) {
    return [];
  }
}

export async function getAllTopics(): Promise<Topic[]> {
  const categories = await getCategories();
  const allTopics: Topic[] = [];
  
  for (const category of categories) {
    const topics = await getTopics(category);
    allTopics.push(...topics);
  }
  
  return allTopics;
}

export async function getCategoryWithTopics(categoryName: string): Promise<Category | null> {
  const topics = await getTopics(categoryName);
  if (topics.length === 0) {
    return null;
  }
  
  return {
    name: categoryName,
    topics,
  };
}

export async function getAllCategoriesWithTopics(): Promise<Category[]> {
  const categories = await getCategories();
  const categoriesWithTopics: Category[] = [];
  
  for (const category of categories) {
    const categoryData = await getCategoryWithTopics(category);
    if (categoryData) {
      categoriesWithTopics.push(categoryData);
    }
  }
  
  return categoriesWithTopics;
}

export async function getTopicContent(category: string, topic: string): Promise<{
  content: string;
  metadata: ContentMetadata | null;
}> {
  try {
    const contentPath = path.join(
      contentDirectory,
      'categories',
      category,
      topic,
      'content.mdx'
    );
    
    const fileContent = await fs.readFile(contentPath, 'utf8');
    const parsed = matter(fileContent);
    
    // Extract metadata from frontmatter
    const metadata = parsed.data && Object.keys(parsed.data).length > 0
      ? { ...parsed.data as ContentMetadata, category, topic }
      : null;
    
    // Return content without frontmatter
    return { content: parsed.content, metadata };
  } catch (error) {
    return { content: '', metadata: null };
  }
}

