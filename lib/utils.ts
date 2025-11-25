/**
 * Calculate estimated reading time in minutes
 * Based on average reading speed of 200 words per minute
 */
export function calculateReadingTime(content: string): number {
  // Remove markdown syntax and HTML tags for accurate word count
  const text = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]+`/g, '') // Remove inline code
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Convert markdown links to text
    .replace(/[#*_~`]/g, '') // Remove markdown formatting
    .replace(/<[^>]+>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();

  const words = text.split(/\s+/).filter(word => word.length > 0);
  const wordsPerMinute = 200;
  const readingTime = Math.ceil(words.length / wordsPerMinute);
  
  return Math.max(1, readingTime); // Minimum 1 minute
}

