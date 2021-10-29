import React, { useEffect, useState } from 'react'
import {
  parseSiteInfoFromQueryParams,
  useSiteInfo,
  usePostAccessList,
  useDailySiteAccess,
} from '../../apis/wordpresscom/wordpressCom.api'
import InsightsTemplate from '../../components/templates/wordpresscom/InsightsTemplate/InsightsTemplate'
import { SEARCH_PERIOD } from '../../interfaces/commonInterfaces'
import { KeywordAccess } from '../../interfaces/keywords/KeywordInfo'
import { PostAccess } from '../../interfaces/wordpresscom/postAccess'
import { UserInfo } from '../../interfaces/wordpresscom/userInfo'
import { AUTH_ERROR_REDIRECT_URL } from '../../services/Consts'
import KeywordService from '../../services/keywords/KeywordService'
import {
  clearUserInfoCache,
  readCachedUserInfo,
  saveUserInfoCache,
} from '../../services/storages/wordPressComStorage'

const InsightsIndexPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>(null)

  const [keywordAccessInfoList, setKeywordAccessInfoList] =
    useState<KeywordAccess[]>(null)

  const { data: siteInfo } = useSiteInfo(userInfo)
  const { data: postAccessList } = usePostAccessList(
    userInfo,
    SEARCH_PERIOD.WEEK
  )
  const { data: siteAccessList } = useDailySiteAccess(userInfo)

  const calcKeywordInfoAsync = async (
    postInfoList: PostAccess[]
  ): Promise<KeywordAccess[]> => {
    return KeywordService.getInstance()
      .parseToKeywordInfo(postInfoList)
      .slice(0, 50)
  }

  useEffect(() => {
    let userInfo = readCachedUserInfo()
    if (userInfo) {
      setUserInfo(userInfo)
      return
    }
    userInfo = parseSiteInfoFromQueryParams(window.location.href)
    if (!userInfo) {
      clearUserInfoCache()
      window.location.href = AUTH_ERROR_REDIRECT_URL
    }
    saveUserInfoCache(userInfo)
    setUserInfo(userInfo)
  }, [])

  useEffect(() => {
    if (!postAccessList) return
    calcKeywordInfoAsync(postAccessList).then((keywords) => {
      setKeywordAccessInfoList(keywords)
    })
  }, [postAccessList])

  return (
    <div>
      <InsightsTemplate
        siteInfo={siteInfo}
        keywordRankingList={keywordAccessInfoList}
        postAccessRankingList={postAccessList}
        dailySiteAccessList={siteAccessList ? siteAccessList.slice(-14) : null}
      />
    </div>
  )
}

export default InsightsIndexPage
