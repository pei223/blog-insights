import { DefaultSeo } from 'next-seo'
import { useRouter } from 'next/router'
import Script from 'next/script'
import React, { useEffect, useState } from 'react'
import { AppContext } from '../stores/AppContext'
import './styles.css'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  const [pageLoading, setPageLoading] = useState(false)

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setPageLoading(true)
    const handleComplete = () => setPageLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  })

  return (
    <AppContext.Provider value={{ pageLoading, setPageLoading }}>
      <DefaultSeo
        defaultTitle="blog insights"
        canonical="https://blog-insights.vercel.app"
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
          site_name: 'blog insights',
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
    </AppContext.Provider>
  )
}
