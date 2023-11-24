import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { EdgeStoreProvider } from './lib/edgestore';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FredFrameAgain',
  description: 'Turn your photos into an actual life cover.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <meta name="theme-color" content="#0E0E10"></meta>
      <meta property="og:image" content="public/fredframeagain-thumbnail.png" />
      <body>
      <EdgeStoreProvider>{children}</EdgeStoreProvider>
      </body>
    </html>
  )
}
