import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/components/Layout";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { getAllCategoriesWithTopics } from "@/lib/content";

// Import version info - will be generated at build time
function getVersionInfo(): { version: string; commitHashShort: string; branch: string; buildDate: string } {
  try {
    return require("@/lib/version.json");
  } catch {
    // Fallback if version.json doesn't exist yet (first run)
    const packageJson = require("../package.json");
    return {
      version: packageJson.version,
      commitHashShort: "dev",
      branch: "dev",
      buildDate: new Date().toLocaleDateString(),
    };
  }
}

const versionInfo = getVersionInfo();

export const metadata: Metadata = {
  title: {
    default: "Learning Resources",
    template: "%s | Learning Resources",
  },
  description: "Your gateway to concise, high-level overviews of technical topics. Explore topics across multiple categories with videos, infographics, and audio content.",
  keywords: ["learning", "tutorials", "technical topics", "education", "resources"],
  authors: [{ name: "Learning Resources" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://learning-resources.com",
    siteName: "Learning Resources",
    title: "Learning Resources",
    description: "Your gateway to concise, high-level overviews of technical topics.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learning Resources",
    description: "Your gateway to concise, high-level overviews of technical topics.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch categories directly from MDX files at build time (server component)
  const categories = await getAllCategoriesWithTopics();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedTheme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const theme = storedTheme || (prefersDark ? 'dark' : 'light');
                  const root = document.documentElement;
                  if (theme === 'light') {
                    root.classList.remove('dark');
                    root.style.colorScheme = 'light';
                  } else {
                    root.classList.add('dark');
                    root.style.colorScheme = 'dark';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <GoogleAnalytics />
        <Layout 
          categories={categories} 
          version={`${versionInfo.version}+${versionInfo.commitHashShort}`}
          versionInfo={versionInfo}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}

