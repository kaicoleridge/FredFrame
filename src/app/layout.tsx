import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { EdgeStoreProvider } from './lib/edgestore';
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'FredFrame - Add Actual Life Filters To Images',
  description: 'Wondered how Fred Again makes those Actual Life Filters? Look no further! Turn your photos into an actual life cover.',
  keywords: 'fred again, actual life, actual life generator, actual life filters, fred again actual life filter maker, Actual Life Filter Maker, fred again actual life generator, fred, fredagain',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
      <script async src="https://fundingchoicesmessages.google.com/i/pub-5819398709937724?ers=1"></script>
        <script>{`
          (function() {
            function signalGooglefcPresent() {
              if (!window.frames['googlefcPresent']) {
                if (document.body) {
                  const iframe = document.createElement('iframe');
                  iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;';
                  iframe.style.display = 'none';
                  iframe.name = 'googlefcPresent';
                  document.body.appendChild(iframe);
                } else {
                  setTimeout(signalGooglefcPresent, 0);
                }
              }
            }
            signalGooglefcPresent();
          })();
        `}</script>
      </Head>
      <link rel="icon" href="favicon.ico" sizes="any" />
      <meta name="google-site-verification" content="06jfqU81pZjNBJfu7vhC_W1Dj_6OLHqIPiyhhc32Lmk" />
      <meta name="theme-color" content="#1f0b88"/>
      <meta property="og:image" content="/thumbnail.png" />
      <meta property="og:site_name" content="FredFrameAgain" />
      <meta property="twitter:image:alt" content="/thumbnail.png" />
      <meta name="google-adsense-account" content="ca-pub-5819398709937724"/>
      <body>
      <EdgeStoreProvider>{children} <Analytics /></EdgeStoreProvider>
      </body>
    </html>
  )
}
