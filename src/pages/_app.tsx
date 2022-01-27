import { DefaultSeo } from 'next-seo'
import { useRouter } from 'next/router'
import Script from 'next/script'
import React, { useEffect, useState } from 'react'
import { DEMO_USER_INFO, UserInfo } from '../interfaces/wordpresscom/userInfo'
import {
  clearUserInfoCache,
  readCachedUserInfo,
} from '../services/storages/wordPressComStorage'
import { AppContext } from '../stores/AppContext'
import './styles.css'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  const [isFetchedUserInfo, setIsFetchedUserInfo] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo>(null)
  const [pageLoading, setPageLoading] = useState(false)
  const [demoMode, setDemoMode] = useState(false)

  useEffect(() => {
    if (!router.isReady) {
      return
    }
    const _demoMode = router.query['demoMode'] === 'true'
    const _userInfo = _demoMode ? DEMO_USER_INFO : readCachedUserInfo()
    setDemoMode(_demoMode)
    setIsFetchedUserInfo(true)
    if (!_userInfo) {
      clearUserInfoCache()
      return
    }
    setUserInfo(_userInfo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  useEffect(() => {
    // TODO デモモードならpush時にquery追加するようにしたい
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
    <AppContext.Provider
      value={{
        pageLoading,
        setPageLoading,
        userInfo,
        setUserInfo,
        demoMode,
      }}
    >
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
      {/* TODO localstorageからのロードはほとんど時間かからないが、気になるほど遅ければロード画面追加 */}
      {isFetchedUserInfo ? <Component {...pageProps} /> : <div>fetching</div>}
    </AppContext.Provider>
  )
}
