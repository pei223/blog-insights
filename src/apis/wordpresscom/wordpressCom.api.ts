import { AxiosResponse } from 'axios'
import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import {
  convertSearchPeriodToCondition,
  SearchPeriod,
} from '../../interfaces/commonInterfaces'
import {
  PostAccess,
  SummarizedPostAccessRes,
} from '../../interfaces/wordpresscom/postAccess'
import {
  convertRawToInfo,
  SiteAccess,
  SiteStatsRes,
} from '../../interfaces/wordpresscom/siteAccess'
import { SiteInfo } from '../../interfaces/wordpresscom/siteInfo'
import { UserInfo } from '../../interfaces/wordpresscom/userInfo'
import { ApiHookResult } from '../common'
import { wordpressComFetcher } from './baseApi'

export const parseSiteInfoFromQueryParams = (url: string): UserInfo | null => {
  if (url.split('#').length !== 2) {
    return null
  }
  const urlParamStr = url.split('#')[1]
  const params = {}
  urlParamStr.split('&').forEach((param) => {
    const fields = param.split('=')
    params[fields[0]] = fields[1]
  })

  if (!params['access_token'] || !params['site_id']) {
    return null
  }
  return {
    accessToken: decodeURIComponent(params['access_token']),
    siteId: params['site_id'],
  }
}

export const isAuthError = (response?: AxiosResponse) => {
  return (
    response &&
    response.status === 400 &&
    response.data.error === 'invalid_token'
  )
}

export const useDailySiteAccess = (
  userInfo: UserInfo | null
): ApiHookResult<SiteAccess[]> => {
  const fetcher = async (url: string, token: string): Promise<SiteAccess[]> => {
    const res = await wordpressComFetcher.get<SiteStatsRes>(url, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${token}`,
      },
    })
    return convertRawToInfo(res.data.visits.data)
  }

  const { data, error } = useSWR<SiteAccess[]>(
    userInfo ? [`/sites/${userInfo.siteId}/stats`, userInfo.accessToken] : null,
    fetcher,
    { dedupingInterval: 1000 * 60 }
  )

  return {
    data,
    loading: !error && !data,
    error: error,
  }
}

export const useSiteInfo = (userInfo: UserInfo): ApiHookResult<SiteInfo> => {
  const fetcher = async (url: string): Promise<SiteInfo> => {
    const res = await wordpressComFetcher.get<SiteInfo>(url)
    return res.data
  }

  const { data, error } = useSWRImmutable<SiteInfo>(
    userInfo ? `/sites/${userInfo.siteId}` : null,
    fetcher
  )

  return {
    data,
    loading: !error && !data,
    error: error,
  }
}

export const usePostAccessList = (
  userInfo: UserInfo | null,
  searchPeriod: SearchPeriod
): ApiHookResult<PostAccess[]> => {
  const condition = convertSearchPeriodToCondition(searchPeriod)

  const fetcher = async (url, token): Promise<PostAccess[]> => {
    const res = await wordpressComFetcher.get<SummarizedPostAccessRes>(url, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data.summary.postviews
  }

  const { data, isValidating, error } = useSWR<PostAccess[]>(
    userInfo
      ? [
          `/sites/${userInfo.siteId}/stats/top-posts?period=${condition.period}&num=${condition.num}&summarize=true`,
          userInfo.accessToken,
        ]
      : null,
    fetcher,
    { dedupingInterval: 1000 * 60 }
  )

  return {
    data,
    loading: isValidating,
    error: error,
  }
}
