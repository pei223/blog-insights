import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { useDemoPostAccessList } from '../../apis/wordpresscom/demoApi'
import {
  isAuthError,
  usePostAccessList,
} from '../../apis/wordpresscom/wordpressCom.api'
import PostsTemplate from '../../components/templates/wordpresscom/posts_view/PostsTemplate'
import { SearchPeriod, SEARCH_PERIOD } from '../../interfaces/commonInterfaces'
import { AUTH_ERROR_REDIRECT_URL } from '../../services/Consts'
import { clearUserInfoCache } from '../../services/storages/wordPressComStorage'
import { AppContext } from '../../stores/AppContext'

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

const DATA_COUNT_PER_PAGE = 20

const PostsPage: React.FC<Props> = ({ page, searchPeriod }) => {
  const router = useRouter()
  const { userInfo, demoMode, setUserInfo } = useContext(AppContext)

  const { data, error, loading } = demoMode
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useDemoPostAccessList(userInfo, searchPeriod)
    : // eslint-disable-next-line react-hooks/rules-of-hooks
      usePostAccessList(userInfo, searchPeriod)

  if (error && isAuthError(error.response)) {
    clearUserInfoCache()
    setUserInfo(null)
    router.replace(AUTH_ERROR_REDIRECT_URL)
  }

  const onConditionChange = (page: number, period: SearchPeriod) => {
    router?.push(
      `/posts?period=${period}&page=${page + 1}${
        demoMode ? '&demoMode=true' : ''
      }`
    )
  }

  return (
    <>
      <NextSeo noindex={true} />
      <PostsTemplate
        demoMode={demoMode}
        loading={loading}
        posts={
          data
            ? data.slice(
                page * DATA_COUNT_PER_PAGE,
                (page + 1) * DATA_COUNT_PER_PAGE
              )
            : []
        }
        totalViews={data ? data.reduce((sum, post) => sum + post.views, 0) : 0}
        page={page}
        maxPage={data ? Math.ceil(data.length / DATA_COUNT_PER_PAGE) : 0}
        dataCountPerPage={DATA_COUNT_PER_PAGE}
        period={searchPeriod}
        onPageChange={(newPage) => onConditionChange(newPage, searchPeriod)}
        onPeriodChange={(newSearchPeriod) =>
          onConditionChange(0, newSearchPeriod)
        }
      />
    </>
  )
}
export default PostsPage
