/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  output: 'export',
  // Note: For static export (output: 'export'), Next.js Image optimization requires
  // either unoptimized: true OR a custom loader (e.g., Cloudinary, Imgix, etc.)
  // Images are still optimized via MDX components with lazy loading and proper sizing
  // For advanced optimization, consider:
  // 1. Using a CDN service with custom loader
  // 2. Pre-processing images at build time with sharp or similar tools
  // 3. Using WebP/AVIF formats manually
  images: {
    unoptimized: true, // Required for static export
    // To enable optimization, use a custom loader:
    // loader: 'custom',
    // loaderFile: './lib/imageLoader.js',
  },
};

export default nextConfig;

