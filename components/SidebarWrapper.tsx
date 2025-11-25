'use client';

import Sidebar from './Sidebar';
import { Category } from '@/types/content';

interface SidebarWrapperProps {
  categories: Category[];
  isOpen: boolean;
  onToggle: () => void;
}

export default function SidebarWrapper({ categories, isOpen, onToggle }: SidebarWrapperProps) {
  return <Sidebar categories={categories} isOpen={isOpen} onToggle={onToggle} />;
}

