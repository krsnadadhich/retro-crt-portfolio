import type { Metadata } from 'next'
import { Share_Tech_Mono, VT323 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { SiteShell } from '@/components/site-shell'

const SITE_URL = 'https://krsnadadhich.vercel.app'

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Krishna Dadhich',
  jobTitle: 'AI Engineer',
  url: SITE_URL,
  email: 'mailto:krsnadadhich@gmail.com',
  sameAs: ['https://github.com/krsnadadhich', 'https://linkedin.com/in/krsnadadhich'],
}

const shareTechMono = Share_Tech_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-share-tech-mono',
  display: 'swap',
})

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323',
  display: 'swap',
})

const title = 'Krishna Dadhich — AI Engineer'
const description = 'AI Engineer building RAG pipelines, LLM applications, and ML/DL solutions: NLP chatbots, computer vision systems, and predictive models. Full ML lifecycle expertise from data preprocessing to production deployment.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  openGraph: {
    title,
    description,
    url: '/',
    siteName: 'Krishna Dadhich',
    images: ['/opengraph-image'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/opengraph-image'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${shareTechMono.variable} ${vt323.variable}`}>
      <body className="font-mono antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SiteShell>{children}</SiteShell>
        <Analytics />
      </body>
    </html>
  )
}
