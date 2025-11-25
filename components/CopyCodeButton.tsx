'use client';

import { useState } from 'react';

interface CopyCodeButtonProps {
  code: string;
}

export default function CopyCodeButton({ code }: CopyCodeButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className="absolute top-3 right-3 lg:right-8 xl:right-12 p-2 bg-gray-200/90 dark:bg-gray-800/90 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 shadow-sm hover:shadow-md border border-gray-300 dark:border-gray-700 hover:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 min-w-[44px] min-h-[44px] flex items-center justify-center z-30"
      aria-label={copied ? 'Copied to clipboard!' : 'Copy code to clipboard'}
      title={copied ? 'Copied!' : 'Copy code'}
    >
      {copied ? (
        <>
          <svg
            className="w-5 h-5 text-green-600 dark:text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="sr-only">Copied to clipboard!</span>
        </>
      ) : (
        <>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <span className="sr-only">Copy code to clipboard</span>
        </>
      )}
    </button>
  );
}

