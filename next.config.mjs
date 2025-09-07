/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/PradhyumanArora_Portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/PradhyumanArora_Portfolio/' : '',
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react']
  },
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  }
}

export default nextConfig
