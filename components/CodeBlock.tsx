'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import CopyCodeButton from './CopyCodeButton';
import { ComponentPropsWithoutRef } from 'react';

interface CodeBlockProps extends ComponentPropsWithoutRef<'pre'> {
  children?: ReactNode;
}

export default function CodeBlock(props: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [codeText, setCodeText] = useState('');

  useEffect(() => {
    if (preRef.current) {
      const codeElement = preRef.current.querySelector('code');
      if (codeElement) {
        setCodeText(codeElement.textContent || '');
      }
    }
  }, [props.children]);

  return (
    <pre
      ref={preRef}
      className="relative bg-gray-100 dark:bg-gray-900 rounded-lg p-4 pr-20 lg:pr-32 xl:pr-40 overflow-x-auto mb-6 border border-gray-300 dark:border-gray-800 shadow-lg group w-full"
      style={{ maxWidth: '100%' }}
      {...props}
    >
      {codeText && <CopyCodeButton code={codeText} />}
      {props.children}
    </pre>
  );
}

