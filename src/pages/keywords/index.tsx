import { GetServerSidePropsContext } from 'next'
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

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const target = context.query.target
    ? (context.query.target as string).toUpperCase()
    : ''
  const page = context.query.page ? Number(context.query.page) : 1

  return {
    props: {
      target: KEYWORD_VIEW_TARGET[target],
      page: page - 1, // 表示上は+1のため
    },
  }
}

type Props = {
  target: KeywordViewTarget
  page: number
}

const KeywordsPage: React.FC<Props> = ({ target, page }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>(null)
  const [keywords, setKeywords] = useState<KeywordAccess[]>(null)

  const { data } = usePostAccessList(userInfo, 'day', 7)

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

  return (
    <KeywordsTemplate
      keywords={keywords}
      defaultViewTarget={target}
      defaultPage={page}
    />
  )
}

export default KeywordsPage
