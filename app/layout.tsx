import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=VT323:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-mono antialiased">
        {children}
      </body>
    </html>
  )
}
