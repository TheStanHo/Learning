import CodeBlock from './CodeBlock';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { VideoPlayer, AudioPlayer } from './MediaPlayers';

type MDXComponentProps = ComponentPropsWithoutRef<'div'> & {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

type MDXHeadingProps = ComponentPropsWithoutRef<'h1'> & {
  children?: ReactNode;
};

type MDXParagraphProps = ComponentPropsWithoutRef<'p'> & {
  children?: ReactNode;
};

type MDXListProps = ComponentPropsWithoutRef<'ul'> & {
  children?: ReactNode;
};

type MDXListItemProps = ComponentPropsWithoutRef<'li'> & {
  children?: ReactNode;
};

type MDXLinkProps = ComponentPropsWithoutRef<'a'> & {
  children?: ReactNode;
  href?: string;
};

type MDXCodeProps = ComponentPropsWithoutRef<'code'> & {
  children?: ReactNode;
  className?: string;
};

type MDXPreProps = ComponentPropsWithoutRef<'pre'> & {
  children?: ReactNode;
};

type MDXBlockquoteProps = ComponentPropsWithoutRef<'blockquote'> & {
  children?: ReactNode;
};

type MDXImageProps = ComponentPropsWithoutRef<'img'> & {
  alt?: string;
  src?: string;
};

type MDXTableProps = ComponentPropsWithoutRef<'table'> & {
  children?: ReactNode;
};

type MDXTableCellProps = ComponentPropsWithoutRef<'th' | 'td'> & {
  children?: ReactNode;
};

type MDXHrProps = ComponentPropsWithoutRef<'hr'>;

export const MDXComponents = {
  VideoPlayer,
  AudioPlayer,
  h1: (props: MDXHeadingProps) => <h1 className="text-4xl font-bold mt-12 mb-6 text-gray-900 dark:text-gray-100" {...props} />,
  h2: (props: MDXHeadingProps) => <h2 className="text-3xl font-bold mt-10 mb-4 text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-800 pb-2" {...props} />,
  h3: (props: MDXHeadingProps) => <h3 className="text-2xl font-semibold mt-8 mb-3 text-gray-900 dark:text-gray-100" {...props} />,
  h4: (props: MDXHeadingProps) => <h4 className="text-xl font-semibold mt-6 mb-2 text-gray-900 dark:text-gray-100" {...props} />,
  p: (props: MDXParagraphProps) => <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300" {...props} />,
  ul: (props: MDXListProps) => <ul className="list-disc list-outside mb-6 space-y-2 ml-6 text-gray-700 dark:text-gray-300" {...props} />,
  ol: (props: MDXListProps) => <ol className="list-decimal list-outside mb-6 space-y-2 ml-6 text-gray-700 dark:text-gray-300" {...props} />,
  li: (props: MDXListItemProps) => <li className="leading-relaxed" {...props} />,
  a: (props: MDXLinkProps) => {
    const href = props.href || '';
    const isExternal = href.startsWith('http://') || href.startsWith('https://');
    const isMailto = href.startsWith('mailto:');
    
    // For external links, add security attributes
    const linkProps = isExternal && !isMailto
      ? {
          ...props,
          target: '_blank',
          rel: 'noopener noreferrer',
        }
      : props;

    return (
      <a
        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline underline-offset-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 rounded"
        {...linkProps}
      />
    );
  },
  code: (props: MDXCodeProps) => {
    const isInline = !props.className;
    if (isInline) {
      return <code className="bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm text-blue-700 dark:text-blue-300 font-mono" {...props} />;
    }
    return <code {...props} />;
  },
  pre: (props: MDXPreProps) => <CodeBlock {...props} />,
  blockquote: (props: MDXBlockquoteProps) => (
    <blockquote className="border-l-4 border-blue-500 pl-6 italic my-6 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-900/50 py-4 rounded-r-lg" {...props} />
  ),
  img: (props: MDXImageProps) => (
    <img 
      className="rounded-lg my-8 max-w-full shadow-lg border border-gray-300 dark:border-gray-800" 
      alt={props.alt || ''}
      loading="lazy"
      {...props} 
    />
  ),
  table: (props: MDXTableProps) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-800 rounded-lg" {...props} />
    </div>
  ),
  th: (props: MDXTableCellProps) => (
    <th className="border border-gray-300 dark:border-gray-800 px-4 py-3 bg-gray-100 dark:bg-gray-900 text-left font-semibold text-gray-900 dark:text-gray-100" {...props} />
  ),
  td: (props: MDXTableCellProps) => (
    <td className="border border-gray-300 dark:border-gray-800 px-4 py-3 text-gray-700 dark:text-gray-300" {...props} />
  ),
  hr: (props: MDXHrProps) => (
    <hr className="my-8 border-gray-300 dark:border-gray-800" {...props} />
  ),
  div: (props: MDXComponentProps) => {
    // Handle divs that might have white backgrounds - make them theme-aware
    const hasWhiteBg = props.className?.includes('bg-white') || 
                       props.style?.background?.includes('white') || 
                       props.style?.backgroundColor?.includes('white') ||
                       props.style?.background === 'white' ||
                       props.style?.backgroundColor === 'white';
    
    if (hasWhiteBg) {
      const { style, className, ...rest } = props;
      const newStyle = { ...style };
      // Remove white background from inline styles, let CSS handle it
      if (newStyle.background?.includes('white')) delete newStyle.background;
      if (newStyle.backgroundColor?.includes('white')) delete newStyle.backgroundColor;
      if (newStyle.background === 'white') delete newStyle.background;
      if (newStyle.backgroundColor === 'white') delete newStyle.backgroundColor;
      
      return (
        <div 
          {...rest} 
          className={`${className || ''} bg-white dark:bg-gray-900`} 
          style={newStyle}
        />
      );
    }
    return <div {...props} />;
  },
};

