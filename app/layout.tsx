import type { Metadata } from 'next'
import { Share_Tech_Mono, VT323 } from 'next/font/google'
import './globals.css'
import { SiteShell } from '@/components/site-shell'

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

export const metadata: Metadata = {
  title: 'Krishna Dadhich — AI Developer & ML Engineer',
  description: 'AI Developer shipping ML/DL solutions: NLP chatbots, computer vision systems, and predictive models. Full ML lifecycle expertise from data preprocessing to production deployment.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${shareTechMono.variable} ${vt323.variable}`}>
      <body className="font-mono antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
