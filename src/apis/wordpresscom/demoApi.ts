import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import { SearchPeriod } from '../../interfaces/commonInterfaces'
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
import { demoFetcher } from './baseApi'

export const useDemoDailySiteAccess = (
  userInfo: UserInfo | null
): ApiHookResult<SiteAccess[]> => {
  const fetcher = async (url: string): Promise<SiteAccess[]> => {
    const res = await demoFetcher.get<SiteStatsRes>(url)
    return convertRawToInfo(res.data.visits.data)
  }

  const { data, error } = useSWR<SiteAccess[]>(
    userInfo && `/daily_access?siteId=${userInfo.siteId}`,
    fetcher,
    {
      dedupingInterval: 1000 * 60,
    }
  )

  return {
    data,
    loading: !error && !data,
    error: error,
  }
}

export const useDemoSiteInfo = (
  userInfo: UserInfo | null
): ApiHookResult<SiteInfo> => {
  const fetcher = async (url: string): Promise<SiteInfo> => {
    const res = await demoFetcher.get<SiteInfo>(url)
    return res.data
  }

  const { data, error } = useSWRImmutable<SiteInfo>(
    userInfo ? `/site_info` : null,
    fetcher
  )

  return {
    data,
    loading: !error && !data,
    error: error,
  }
}

export const useDemoPostAccessList = (
  userInfo: UserInfo | null,
  searchPeriod: SearchPeriod
): ApiHookResult<PostAccess[]> => {
  const fetcher = async (url): Promise<PostAccess[]> => {
    const res = await demoFetcher.get<SummarizedPostAccessRes>(url)
    return res.data.summary.postviews
  }

  const { data, isValidating, error } = useSWR<PostAccess[]>(
    userInfo &&
      `/post_access?condition=${searchPeriod}?siteId=${userInfo.siteId}`,
    fetcher,
    { dedupingInterval: 1000 * 60 }
  )

  return {
    data,
    loading: isValidating,
    error: error,
  }
}
