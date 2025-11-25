export interface ContentMetadata {
  title: string;
  description?: string;
  category: string;
  topic: string;
  tags?: string[];
  type: 'text' | 'video' | 'audio' | 'mixed';
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  name: string;
  description?: string;
  topics: Topic[];
}

export interface Topic {
  name: string;
  description?: string;
  category: string;
  tags?: string[];
  contentPath: string;
  metadata?: ContentMetadata;
}

