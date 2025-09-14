import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Accept All Fund - Micro-VC for Indie Entrepreneurs',
    template: '%s | Accept All Fund'
  },
  description: 'We back solo founders, vibe coders, and indie hackers using AI to ship products, SaaS, apps, and games. $50k–$100k checks. No board seats. No drama.',
  keywords: [
    'micro vc',
    'indie hackers', 
    'solo founders',
    'venture capital',
    'startup funding',
    'AI entrepreneurs',
    'SaaS funding',
    'app development',
    'game development',
    'indie developers',
    'seed funding',
    'early stage investment'
  ],
  authors: [{ name: 'Accept All Fund', url: 'https://acceptall.fund' }],
  creator: 'Accept All Fund',
  publisher: 'Accept All Fund',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://acceptall.fund'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'en': '/en',
    },
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://acceptall.fund',
    title: 'Accept All Fund - Micro-VC for Indie Entrepreneurs',
    description: 'We back solo founders, vibe coders, and indie hackers using AI to ship products, SaaS, apps, and games. $50k–$100k checks. No board seats. No drama.',
    siteName: 'Accept All Fund',
    images: [
      {
        url: '/sociallimage.png',
        width: 1474,
        height: 644,
        alt: 'Accept All Fund - Micro-VC for Indie Entrepreneurs',
        type: 'image/png',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accept All Fund - Micro-VC for Indie Entrepreneurs',
    description: 'We back solo founders, vibe coders, and indie hackers using AI to ship products, SaaS, apps, and games. $50k–$100k checks. No board seats. No drama.',
    site: '@acceptallfund',
    creator: '@acceptallfund',
    images: ['/sociallimage.png'],
  },
  verification: {
    google: 'google',
    yandex: 'yandex',
    yahoo: 'yahoo',
    other: {
      me: ['my-email', 'my-link'],
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ],
  colorScheme: 'light dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Accept All Fund",
    "alternateName": "AcceptAll Fund",
    "description": "Micro-VC backing solo founders, vibe coders, and indie hackers using AI to ship products, SaaS, apps, and games.",
    "url": "https://acceptall.fund",
    "logo": "https://acceptall.fund/favicon.svg",
    "image": "https://acceptall.fund/sociallimage.png",
    "foundingDate": "2024",
    "sameAs": [
      "https://twitter.com/acceptallfund",
      "https://github.com/acceptallfund"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://acceptall.fund"
    },
    "brand": {
      "@type": "Brand",
      "name": "Accept All Fund"
    }
  }

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Accept All Fund",
    "url": "https://acceptall.fund",
    "description": "Micro-VC for indie entrepreneurs. We back solo founders, vibe coders, and indie hackers using AI.",
    "publisher": {
      "@type": "Organization",
      "name": "Accept All Fund"
    }
  }

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
