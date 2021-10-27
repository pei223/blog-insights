import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { usePostAccessList } from '../../apis/wordpresscom/wordpressCom.api'
import KeywordsTemplate from '../../components/templates/wordpresscom/keyword_view/KeywordsTemplate'
import {
  KeywordAccess,
  KeywordViewTarget,
  KEYWORD_VIEW_TARGET,
} from '../../interfaces/keywords/KeywordInfo'
import { UserInfo } from '../../interfaces/wordpresscom/userInfo'
import KeywordService from '../../services/keywords/KeywordService'
import { readCachedUserInfo } from '../../services/storages/wordPressComStorage'

const KeywordsPage = () => {
  const router = useRouter()

  const [userInfo, setUserInfo] = useState<UserInfo>(null)
  const [keywords, setKeywords] = useState<KeywordAccess[]>(null)

  const { data } = usePostAccessList(userInfo, 'day', 7)

  const viewType =
    KEYWORD_VIEW_TARGET[
      (router.query['target'] as string)?.toUpperCase() as KeywordViewTarget
    ]

  useEffect(() => {
    const _userInfo = readCachedUserInfo()
    if (_userInfo) {
      setUserInfo(_userInfo)
    }
  }, [])

  useEffect(() => {
    if (!data) return
    setKeywords(KeywordService.getInstance().parseToKeywordInfo(data))
  }, [data])

  return <KeywordsTemplate keywords={keywords} defaultViewTarget={viewType} />
}

export default KeywordsPage
