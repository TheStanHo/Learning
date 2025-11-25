'use client';

interface VersionInfo {
  version: string;
  commitHashShort: string;
  branch: string;
  buildDate: string;
}

interface FooterProps {
  version: string;
  versionInfo?: VersionInfo;
}

export default function Footer({ version, versionInfo }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
              About
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Your gateway to concise, high-level overviews of technical topics.
            </p>
            <a
              href="https://stanho.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors"
            >
              Visit stanho.dev →
            </a>
          </div>

          {/* Built With Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Built With
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
                >
                  Next.js
                </a>
              </li>
              <li>
                <a
                  href="https://react.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
                >
                  React
                </a>
              </li>
              <li>
                <a
                  href="https://www.typescriptlang.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
                >
                  TypeScript
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindcss.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
                >
                  Tailwind CSS
                </a>
              </li>
              <li>
                <a
                  href="https://mdxjs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
                >
                  MDX
                </a>
              </li>
            </ul>
          </div>

          {/* Version & Info Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Version
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span className="font-mono">v{version}</span>
            </p>
            {versionInfo && (
              <>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">
                  Branch: <span className="font-mono">{versionInfo.branch}</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">
                  Commit: <span className="font-mono">{versionInfo.commitHashShort}</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">
                  Built: {versionInfo.buildDate}
                </p>
              </>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-500">
              © {currentYear} Learning Resources
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

