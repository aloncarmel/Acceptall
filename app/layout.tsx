import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Accept All Fund - Micro-VC for Indie Entrepreneurs',
  description: 'We back solo founders, vibe coders, and indie hackers using AI to ship products, SaaS, apps, and games. $50k–$100k checks. No board seats. No drama.',
  keywords: 'micro vc, indie hackers, solo founders, venture capital, startup funding, AI entrepreneurs',
  authors: [{ name: 'Accept All Fund' }],
  metadataBase: new URL('https://acceptall.fund'),
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Accept All Fund - Micro-VC for Indie Entrepreneurs',
    description: 'We back solo founders, vibe coders, and indie hackers using AI to ship products, SaaS, apps, and games.',
    type: 'website',
    url: 'https://acceptall.fund',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accept All Fund - Micro-VC for Indie Entrepreneurs',
    description: 'We back solo founders, vibe coders, and indie hackers using AI to ship products, SaaS, apps, and games.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
