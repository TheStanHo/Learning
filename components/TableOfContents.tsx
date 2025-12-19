'use client';

import { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from content (h2, h3, h4)
    const headingRegex = /^(#{2,4})\s+(.+)$/gm;
    const matches = Array.from(content.matchAll(headingRegex));
    
    const extractedHeadings: Heading[] = matches.map((match, index) => {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      
      return { id, text, level };
    });

    setHeadings(extractedHeadings);

    // Set IDs on actual headings in the DOM
    const headingElements = document.querySelectorAll('h2, h3, h4');
    headingElements.forEach((el, index) => {
      if (extractedHeadings[index]) {
        el.id = extractedHeadings[index].id;
      }
    });
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -35% 0%' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    
    // Calculate offset - TOC is at top-24 (96px), so header is likely around that height
    const header = document.querySelector('main[id="main-content"] > div.sticky.top-0') as HTMLElement;
    const headerHeight = header ? Math.ceil(header.getBoundingClientRect().height) : 96;
    // Use smaller padding - just enough to clear the header with some breathing room
    const offset = headerHeight + 16;
    
    // Use offsetTop which is more reliable for absolute positioning
    let elementTop = 0;
    let currentElement: HTMLElement | null = element;
    
    while (currentElement) {
      elementTop += currentElement.offsetTop;
      currentElement = currentElement.offsetParent as HTMLElement | null;
    }
    
    // Calculate target position
    const targetPosition = elementTop - offset;
    
    // Scroll to the calculated position
    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: 'smooth',
    });
    
    // Update URL hash
    setTimeout(() => {
      if (window.location.hash !== `#${id}`) {
        window.history.replaceState(null, '', `#${id}`);
      }
    }, 100);
  };

  return (
    <nav
      className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto hidden lg:block z-10"
      aria-label="Table of contents"
    >
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wide">
          Table of Contents
        </h2>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={`text-sm ${
                heading.level === 2
                  ? 'ml-0'
                  : heading.level === 3
                  ? 'ml-4'
                  : 'ml-8'
              }`}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHeading(heading.id);
                }}
                className={`block py-1 transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                  activeId === heading.id
                    ? 'text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

