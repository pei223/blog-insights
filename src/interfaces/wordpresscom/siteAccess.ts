/* eslint-disable @typescript-eslint/naming-convention */
export type SiteStatsRes = {
  stats: SiteStats
  visits: {
    data: SiteAccessRawData[]
  }
}

export type SiteStats = {
  visitors_today: number
  visitors_yesterday: number
  views_today: number
  views_yesterday: number
}

type SiteAccessRawData = string | number[]

export type SiteAccess = {
  date: Date
  views: number
  visitors: number
}

export const convertRawToInfo = (
  rawData: SiteAccessRawData[]
): SiteAccess[] => {
  return rawData.map((raw) => {
    const dateFields = (raw[0] as string).split('-')
    const date = new Date(
      Number(dateFields[0]),
      Number(dateFields[1]) - 1,
      Number(dateFields[2])
    )
    const info: SiteAccess = {
      date: date,
      views: raw[1] as number,
      visitors: raw[2] as number,
    }
    return info
  })
}
