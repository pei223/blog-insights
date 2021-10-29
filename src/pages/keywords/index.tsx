import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect, useState } from 'react'
import { usePostAccessList } from '../../apis/wordpresscom/wordpressCom.api'
import KeywordsTemplate from '../../components/templates/wordpresscom/keyword_view/KeywordsTemplate'
import { SearchPeriod, SEARCH_PERIOD } from '../../interfaces/commonInterfaces'
import {
  KeywordAccess,
  KeywordViewTarget,
  KEYWORD_VIEW_TARGET,
  sortKeywordsBy,
} from '../../interfaces/keywords/KeywordInfo'
import { UserInfo } from '../../interfaces/wordpresscom/userInfo'
import KeywordService from '../../services/keywords/KeywordService'
import { readCachedUserInfo } from '../../services/storages/wordPressComStorage'

export const getServerSideProps = (
  context: GetServerSidePropsContext
): GetServerSidePropsResult<Props> => {
  const viewTarget = context.query.target
    ? (context.query.target as string).toUpperCase()
    : undefined
  const searchPeriod = context.query.period
    ? (context.query.period as string).toUpperCase()
    : undefined
  const page = context.query.page ? Number(context.query.page) : 1

  return {
    props: {
      viewTarget:
        viewTarget && KEYWORD_VIEW_TARGET[viewTarget]
          ? KEYWORD_VIEW_TARGET[viewTarget]
          : KEYWORD_VIEW_TARGET.AVERAGE_POST_ACCESS,
      searchPeriod:
        searchPeriod && SEARCH_PERIOD[searchPeriod]
          ? SEARCH_PERIOD[searchPeriod]
          : SEARCH_PERIOD.WEEK,
      page: page - 1, // 表示上は+1のため
    },
  }
}

type Props = {
  viewTarget: KeywordViewTarget
  page: number
  searchPeriod: SearchPeriod
}

const DATA_PER_PAGE = 20

const KeywordsPage: React.FC<Props> = ({ viewTarget, page, searchPeriod }) => {
  const router = useRouter()

  const [userInfo, setUserInfo] = useState<UserInfo>(null)

  const { data, loading: apiLoading } = usePostAccessList(
    userInfo,
    searchPeriod
  )

  const [keywords, setKeywords] = useState<KeywordAccess[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const _userInfo = readCachedUserInfo()
    if (!_userInfo) {
      router.push('/error')
      return
    }
    setUserInfo(_userInfo)
    // 初回マウントのみの処理のため
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!data) return
    const newKeywords = KeywordService.getInstance().parseToKeywordInfo(data)
    setKeywords(sortKeywordsBy(newKeywords, viewTarget))
    setLoading(false)
    // APIからのデータ変更時のみ処理するため
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const onConditionChange = (
    period: SearchPeriod,
    target: KeywordViewTarget,
    page: number
  ) => {
    router?.push(`/keywords?target=${target}&period=${period}&page=${page + 1}`)
  }

  useEffect(() => {
    setLoading(true)
    setKeywords(sortKeywordsBy(keywords, viewTarget))
    setLoading(false)
    // 表示対象、ページ変更検知のため
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewTarget])

  return (
    <KeywordsTemplate
      loading={loading || apiLoading}
      keywords={keywords.slice(
        page * DATA_PER_PAGE,
        (page + 1) * DATA_PER_PAGE
      )}
      viewTarget={viewTarget}
      page={page}
      maxPage={Math.ceil(keywords.length / DATA_PER_PAGE)}
      period={searchPeriod}
      onPageChange={(newPage) =>
        onConditionChange(searchPeriod, viewTarget, newPage)
      }
      onPeriodChange={(newPeriod) =>
        onConditionChange(newPeriod, viewTarget, 0)
      }
      onViewTargetChange={(newTarget) =>
        onConditionChange(searchPeriod, newTarget, 0)
      }
    />
  )
}
export default KeywordsPage
