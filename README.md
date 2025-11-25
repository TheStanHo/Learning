# Learning Resources Website

A personal learning resources website built with Next.js, TypeScript, Tailwind CSS, and MDX. This site allows you to organize and display learning materials including text (MDX), video, and audio content.

## Features

- **Homepage**: Welcome page with quick navigation and category overview
- **Sidebar Navigation**: Collapsible sidebar with hierarchical topic organization
- **MDX Content**: Support for rich text content with React components
- **Media Players**: Custom video and audio players with accessibility features
- **Search Functionality**: Full-text search across all topics
- **Dark Mode**: Theme toggle with system preference detection
- **Reading Experience**: 
  - Table of contents for long articles
  - Reading progress indicator
  - Font size controls
  - Recently viewed topics
  - Related topics suggestions
- **Code Features**: Syntax highlighting with copy-to-clipboard functionality
- **SEO Optimized**: 
  - Automatic sitemap generation
  - Robots.txt configuration
  - Structured data (JSON-LD)
  - Open Graph and Twitter Card meta tags
- **Analytics**: Google Analytics integration for tracking
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **Static Export**: Fully static site deployable to GitHub Pages
- **Version Tracking**: Build-time version information with Git commit tracking
- **No Backend**: File-based content, no database required
- **Simple Content Management**: Edit MDX files directly in code and push to deploy

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                          # Next.js app directory
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout with Google Analytics
│   ├── not-found.tsx             # 404 page
│   ├── sitemap.ts                # Dynamic sitemap generation
│   ├── robots.ts                 # Robots.txt generation
│   └── topics/                   # Topic pages
│       ├── page.tsx              # Topics listing page
│       └── [category]/
│           └── [topic]/
│               ├── page.tsx      # Individual topic page
│               └── not-found.tsx # Topic 404 page
├── components/                    # React components
│   ├── Layout.tsx                # Main layout with sidebar
│   ├── Sidebar.tsx               # Navigation sidebar
│   ├── VideoPlayer.tsx           # Video player component
│   ├── AudioPlayer.tsx           # Audio player component
│   ├── GoogleAnalytics.tsx       # Google Analytics integration
│   ├── Search.tsx                # Search functionality
│   ├── TableOfContents.tsx       # TOC for articles
│   ├── ReadingProgress.tsx       # Reading progress bar
│   ├── RecentlyViewed.tsx        # Recently viewed topics
│   ├── RelatedTopics.tsx         # Related topics suggestions
│   ├── Breadcrumbs.tsx           # Navigation breadcrumbs
│   ├── CodeBlock.tsx             # Syntax highlighted code blocks
│   ├── CopyCodeButton.tsx        # Copy code to clipboard
│   ├── FontSizeControls.tsx      # Font size adjustment
│   ├── ThemeToggle.tsx           # Dark/light mode toggle
│   ├── BackToTop.tsx             # Scroll to top button
│   ├── StructuredData.tsx        # JSON-LD structured data
│   └── MDXComponents.tsx         # Custom MDX components
├── content/                       # Learning resources
│   └── categories/               # Content organized by category
│       └── [category]/
│           └── [topic]/
│               ├── content.mdx   # Topic content
│               └── metadata.json # Optional metadata
├── lib/                          # Utility functions
│   ├── content.ts               # Content management and parsing
│   ├── mdx.ts                   # MDX rendering utilities
│   └── utils.ts                 # General utilities
├── public/                       # Static assets
│   └── media/                   # Video and audio files
│       └── [category]/
│           └── [topic]/         # Media organized by topic
├── scripts/                      # Build scripts
│   └── build-with-version.js    # Build script with version generation
└── types/                        # TypeScript type definitions
    └── content.ts                # Content-related types
```

## Adding Content

### Creating a Category

1. Create a directory in `content/categories/[category-name]/`
2. Optionally create a `metadata.json` file

### Creating a Topic

1. Create a directory in `content/categories/[category-name]/[topic-name]/`
2. Create `content.mdx` with your content
3. Optionally create `metadata.json`:

```json
{
  "title": "Topic Title",
  "description": "Topic description",
  "category": "category-name",
  "topic": "topic-name",
  "tags": ["tag1", "tag2"],
  "type": "text",
  "createdAt": "2024-01-01",
  "updatedAt": "2024-01-01"
}
```

### Using Media in MDX

You can use the custom components in your MDX files:

```mdx
import { VideoPlayer, AudioPlayer } from '@/components';

# My Topic

<VideoPlayer src="/media/video.mp4" title="My Video" />

<AudioPlayer src="/media/audio.mp3" title="My Audio" />
```

## Building for Production

```bash
npm run build
```

This will:
1. Generate version information from Git (commit hash, branch, build date)
2. Generate `lib/version.json` and `lib/version.txt` with build metadata
3. Build the static site in the `out` directory

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build with version tracking (generates version info from Git)
- `npm run build:simple` - Simple build without version tracking
- `npm start` - Start production server (for testing static export)
- `npm run lint` - Run ESLint
- `npm run version:patch` - Bump patch version
- `npm run version:minor` - Bump minor version
- `npm run version:major` - Bump major version

## Deployment to GitHub Pages

The project includes a GitHub Actions workflow for automatic deployment:

1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select "GitHub Actions" as the source
4. The workflow (`.github/workflows/deploy.yml`) will automatically:
   - Build the site with version tracking
   - Generate static files in the `out` directory
   - Deploy to GitHub Pages on push to `main` branch

The build process includes:
- Git commit hash tracking
- Branch information
- Build timestamp
- Version information displayed in the footer

### Custom Domain

If deploying to a subdirectory, update `next.config.mjs`:

```javascript
const nextConfig = {
  basePath: '/your-repo-name',
  assetPrefix: '/your-repo-name',
  // ... rest of config
};
```

## Technologies

- **Next.js 16**: React framework with App Router and static export
- **React 19**: Latest React with server components
- **TypeScript**: Type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS framework with dark mode support
- **MDX**: Markdown with JSX for rich content
- **next-mdx-remote**: MDX rendering for static export
- **rehype-highlight**: Syntax highlighting for code blocks
- **remark-gfm**: GitHub Flavored Markdown support
- **Google Analytics**: Website analytics and tracking

## Additional Features

### SEO & Analytics
- Automatic sitemap generation (`/sitemap.xml`)
- Robots.txt configuration (`/robots.txt`)
- Structured data (JSON-LD) for rich snippets
- Open Graph and Twitter Card meta tags
- Google Analytics integration

### Accessibility
- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader optimized
- Skip to content link
- Proper semantic HTML structure
- ARIA labels and landmarks

### User Experience
- Dark/light theme with system preference detection
- Responsive design (mobile-first)
- Reading progress indicator
- Table of contents for long articles
- Recently viewed topics tracking
- Related topics suggestions
- Font size controls
- Search functionality

## License

MIT

