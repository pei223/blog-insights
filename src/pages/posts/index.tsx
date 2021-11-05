import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect, useState } from 'react'
import {
  isAuthError,
  usePostAccessList,
} from '../../apis/wordpresscom/wordpressCom.api'
import PostsTemplate from '../../components/templates/wordpresscom/posts_view/PostsTemplate'
import { SearchPeriod, SEARCH_PERIOD } from '../../interfaces/commonInterfaces'
import { UserInfo } from '../../interfaces/wordpresscom/userInfo'
import { AUTH_ERROR_REDIRECT_URL } from '../../services/Consts'
import {
  clearUserInfoCache,
  readCachedUserInfo,
} from '../../services/storages/wordPressComStorage'

export const getServerSideProps = (
  context: GetServerSidePropsContext
): GetServerSidePropsResult<Props> => {
  const searchPeriod = context.query.period
    ? (context.query.period as string).toUpperCase()
    : undefined
  const page = context.query.page ? Number(context.query.page) : 1
  return {
    props: {
      searchPeriod:
        searchPeriod && SEARCH_PERIOD[searchPeriod]
          ? SEARCH_PERIOD[searchPeriod]
          : SEARCH_PERIOD.WEEK,
      page: page - 1, // 表示上は+1のため
    },
  }
}

type Props = {
  page: number
  searchPeriod: SearchPeriod
}

const DATA_PER_PAGE = 20

const PostsPage: React.FC<Props> = ({ page, searchPeriod }) => {
  const router = useRouter()

  const [userInfo, setUserInfo] = useState<UserInfo>(null)

  const { data, error, loading } = usePostAccessList(userInfo, searchPeriod)

  if (error && isAuthError(error.response)) {
    clearUserInfoCache()
    router.replace(AUTH_ERROR_REDIRECT_URL)
  }

  useEffect(() => {
    const _userInfo = readCachedUserInfo()
    if (!_userInfo) {
      clearUserInfoCache()
      router.replace(AUTH_ERROR_REDIRECT_URL)
      return
    }
    setUserInfo(_userInfo)
    // 初回マウントのみの処理のため
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onConditionChange = (page: number, period: SearchPeriod) => {
    router?.push(`/posts?period=${period}&page=${page + 1}`)
  }

  return (
    <PostsTemplate
      loading={loading}
      posts={
        data ? data.slice(page * DATA_PER_PAGE, (page + 1) * DATA_PER_PAGE) : []
      }
      page={page}
      maxPage={data ? Math.ceil(data.length / DATA_PER_PAGE) : 0}
      period={searchPeriod}
      onPageChange={(newPage) => onConditionChange(newPage, searchPeriod)}
      onPeriodChange={(newSearchPeriod) =>
        onConditionChange(0, newSearchPeriod)
      }
    />
  )
}
export default PostsPage
