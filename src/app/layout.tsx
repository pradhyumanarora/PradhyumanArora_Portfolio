import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pradhyuman Arora | Software Engineer',
  description: 'Software Engineer at Microsoft with 2+ years building cloud infrastructure, distributed systems, and security products for Microsoft Defender for Cloud Apps.',
  keywords: ['software engineer', 'cloud infrastructure', 'distributed systems', 'backend', 'Microsoft', 'Azure', 'TypeScript', 'Python', 'portfolio'],
  authors: [{ name: 'Pradhyuman Arora' }],
  creator: 'Pradhyuman Arora',
  publisher: 'Pradhyuman Arora',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://your-portfolio-domain.com'),
  openGraph: {
    title: 'Pradhyuman Arora | Software Engineer',
    description: 'Software Engineer at Microsoft building cloud infrastructure, distributed systems, and security products.',
    url: 'https://your-portfolio-domain.com',
    siteName: 'Pradhyuman Arora',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pradhyuman Arora — Software Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pradhyuman Arora | Software Engineer',
    description: 'Software Engineer at Microsoft building cloud infrastructure, distributed systems, and security products.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
