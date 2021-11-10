/* eslint-disable @typescript-eslint/naming-convention */
export type PostAccessRes = {
  date: string
  days: {
    [key: string]: {
      total_views: number
      postviews: PostAccess[]
    }
  }
}

export type SummarizedPostAccessRes = {
  date: string
  period: string
  summary: {
    postviews: PostAccess[]
    total_views: number
  }
}

export type PostAccess = {
  id: number
  href: string
  date: string
  title: string
  type: string
  views: number
  children?: any
  video_play?: boolean
}
