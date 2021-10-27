/* eslint-disable @typescript-eslint/naming-convention */
export type KeywordAccess = {
  keyword: string
  totalAccess: number // アクセス数
  postCount: number // このキーワードが使われている記事数
  averagePostAccess: number // このキーワードが使われた記事は平均何アクセスか
}

export const KEYWORD_VIEW_TARGET = {
  TOTAL_ACCESS: 'total_access',
  POST_COUNT: 'post_count',
  AVERAGE_POST_ACCESS: 'average_post_access',
} as const

export type KeywordViewTarget =
  typeof KEYWORD_VIEW_TARGET[keyof typeof KEYWORD_VIEW_TARGET]

export const sortKeywordsBy = (
  keywords: KeywordAccess[] | null,
  target: KeywordViewTarget
): KeywordAccess[] | null => {
  if (!keywords) return null
  const sortedKeywords = keywords.slice()
  switch (target) {
    case KEYWORD_VIEW_TARGET.TOTAL_ACCESS:
      sortedKeywords.sort((k1, k2) => k2.totalAccess - k1.totalAccess)
      break
    case KEYWORD_VIEW_TARGET.POST_COUNT:
      sortedKeywords.sort((k1, k2) => k2.postCount - k1.postCount)
      break
    case KEYWORD_VIEW_TARGET.AVERAGE_POST_ACCESS:
      sortedKeywords.sort(
        (k1, k2) => k2.averagePostAccess - k1.averagePostAccess
      )
      break
  }
  return sortedKeywords
}
