import Script from 'next/script'
import React from 'react'
import './styles.css'

export default function MyApp({ Component, pageProps }) {
  if (process.env.NEXT_PUBLIC_DEPLOY_MODE === 'dev') {
    return <Component {...pageProps} />
  }
  return (
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
      <Component {...pageProps} />
    </>
  )
}
