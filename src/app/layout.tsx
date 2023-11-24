import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { EdgeStoreProvider } from './lib/edgestore';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FredFrameAgain - Add Actual Life filters to images',
  description: 'Turn your photos into an actual life cover.',
  keywords: 'fred again, actual life, actual life generator, actual life filters, fred again actual life filter maker, Actual Life Filter Maker,',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="icon" href="favicon.ico" sizes="any" />
      <meta name="theme-color" content="#0E0E10"></meta>
      <meta property="og:image" content="/fredframeagain-thumbnail.png" />
      <body>
      <EdgeStoreProvider>{children} <Analytics /></EdgeStoreProvider>
      </body>
    </html>
  )
}
