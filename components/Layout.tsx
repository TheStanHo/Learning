'use client';

import { useState, useEffect } from 'react';
import SidebarWrapper from './SidebarWrapper';
import { Category } from '@/types/content';
import Search from './Search';
import ThemeToggle from './ThemeToggle';
import SkipToContent from './SkipToContent';
import ReadingProgress from './ReadingProgress';
import BackToTop from './BackToTop';
import ErrorBoundary from './ErrorBoundary';
import Footer from './Footer';

interface VersionInfo {
  version: string;
  commitHashShort: string;
  branch: string;
  buildDate: string;
}

interface LayoutProps {
  children: React.ReactNode;
  categories: Category[];
  version: string;
  versionInfo?: VersionInfo;
}

export default function Layout({ children, categories, version, versionInfo }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-close sidebar on mobile by default
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <ErrorBoundary>
      <SkipToContent />
      <ReadingProgress />
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
        {/* Overlay for mobile when sidebar is open */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
        <SidebarWrapper categories={categories} isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main 
          id="main-content"
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen && !isMobile ? 'md:ml-64' : 'ml-0'
          }`}
        >
          <div className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 px-4 md:px-8 py-3 flex items-center gap-4">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2.5 min-w-[44px] min-h-[44px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-blue-500/50 transition-all duration-200 text-gray-900 dark:text-gray-100 flex items-center justify-center"
                aria-label="Open sidebar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            <Search categories={categories} />
            <ThemeToggle />
          </div>
          <div className="p-4 md:p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
      <Footer version={version} versionInfo={versionInfo} />
      <BackToTop />
      <div className="no-print" />
    </ErrorBoundary>
  );
}

