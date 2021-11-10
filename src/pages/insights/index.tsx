import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import {
  useDemoDailySiteAccess,
  useDemoPostAccessList,
  useDemoSiteInfo,
} from '../../apis/wordpresscom/demoApi'
import {
  parseSiteInfoFromQueryParams,
  useSiteInfo,
  usePostAccessList,
  useDailySiteAccess,
  isAuthError,
} from '../../apis/wordpresscom/wordpressCom.api'
import InsightsTemplate from '../../components/templates/wordpresscom/InsightsTemplate/InsightsTemplate'
import { SEARCH_PERIOD } from '../../interfaces/commonInterfaces'
import { KeywordAccess } from '../../interfaces/keywords/KeywordInfo'
import { PostAccess } from '../../interfaces/wordpresscom/postAccess'
import {
  DEMO_USER_INFO,
  UserInfo,
} from '../../interfaces/wordpresscom/userInfo'
import { AUTH_ERROR_REDIRECT_URL } from '../../services/Consts'
import KeywordService from '../../services/keywords/KeywordService'
import {
  clearUserInfoCache,
  readCachedUserInfo,
  saveUserInfoCache,
} from '../../services/storages/wordPressComStorage'

export const getServerSideProps = (
  context: GetServerSidePropsContext
): GetServerSidePropsResult<Props> => {
  const demoMode =
    context.query.demoMode && context.query.demoMode === 'true' ? true : false
  return {
    props: {
      demoMode: demoMode,
    },
  }
}

type Props = {
  demoMode: boolean
}

const InsightsIndexPage: React.FC<Props> = ({ demoMode }) => {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<UserInfo>(null)

  const [keywordAccessInfoList, setKeywordAccessInfoList] =
    useState<KeywordAccess[]>(null)

  const { data: siteInfo, error: siteInfoError } = demoMode
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useDemoSiteInfo(userInfo)
    : // eslint-disable-next-line react-hooks/rules-of-hooks
      useSiteInfo(userInfo)
  const { data: postAccessList, error: postAccessError } = demoMode
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useDemoPostAccessList(userInfo, SEARCH_PERIOD.WEEK)
    : // eslint-disable-next-line react-hooks/rules-of-hooks
      usePostAccessList(userInfo, SEARCH_PERIOD.WEEK)
  const { data: siteAccessList, error: siteAccessError } = demoMode
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useDemoDailySiteAccess(userInfo)
    : // eslint-disable-next-line react-hooks/rules-of-hooks
      useDailySiteAccess(userInfo)

  const calcKeywordInfoAsync = async (
    postInfoList: PostAccess[]
  ): Promise<KeywordAccess[]> => {
    return KeywordService.getInstance()
      .parseToKeywordInfo(postInfoList)
      .slice(0, 50)
  }

  useEffect(() => {
    let userInfo = demoMode ? DEMO_USER_INFO : readCachedUserInfo()
    if (userInfo) {
      setUserInfo(userInfo)
      return
    }
    userInfo = parseSiteInfoFromQueryParams(window.location.href)
    if (!userInfo) {
      clearUserInfoCache()
      router.replace(AUTH_ERROR_REDIRECT_URL)
      return
    }
    saveUserInfoCache(userInfo)
    setUserInfo(userInfo)
    // 初回マウントのみの処理のため
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!postAccessList) return
    calcKeywordInfoAsync(postAccessList).then((keywords) => {
      setKeywordAccessInfoList(keywords)
    })
  }, [postAccessList])

  if (siteInfoError || siteAccessError || postAccessError) {
    const error = siteInfoError || siteAccessError || postAccessError
    if (isAuthError(error.response)) {
      clearUserInfoCache()
      router.replace(AUTH_ERROR_REDIRECT_URL)
    }
  }

  return (
    <>
      <NextSeo noindex={true} />
      <InsightsTemplate
        demoMode={demoMode}
        siteInfo={siteInfo}
        keywordRankingList={keywordAccessInfoList}
        postAccessRankingList={postAccessList?.slice(0, 50)}
        dailySiteAccessList={
          siteAccessList ? siteAccessList.slice(isMobile ? -14 : -30) : null
        }
      />
    </>
  )
}

export default InsightsIndexPage
