import { NextSeo } from 'next-seo'
import Script from 'next/script'
import React from 'react'
import './styles.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextSeo
        canonical="https://blog-insights.vercel.app"
        title="blog insights"
        description="Wordpressブログアクセス分析ツール"
        twitter={{
          handle: '',
          site: '',
          cardType: 'summary',
        }}
        openGraph={{
          type: 'website',
          title: 'blog insights',
          description: 'Wordpressブログアクセス分析ツール',
          url: 'https://blog-insights.vercel.app',
          // TODO OGP画像
          images: [],
        }}
      />
      {process.env.NEXT_PUBLIC_DEPLOY_MODE === 'prod' && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-TXTJZEP4LG"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-TXTJZEP4LG');
        `}
          </Script>
        </>
      )}

      <Component {...pageProps} />
    </>
  )
}
