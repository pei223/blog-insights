export const SEARCH_PERIOD = {
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  HALF_YEAR: 'half_year',
  YEAR: 'year',
} as const

export type SearchPeriod = typeof SEARCH_PERIOD[keyof typeof SEARCH_PERIOD]

export type SearchCondition = {
  period: 'day' | 'month' | 'year'
  num: number
}

/**
 * 検索期間を検索条件に変換する
 * @param searchPeriod
 * @returns
 */
export const convertSearchPeriodToCondition = (
  searchPeriod: SearchPeriod
): SearchCondition => {
  // NOTE なぜかWordpress.comのAPIのperiodをday以外にするとまともに取得できない
  // https://developer.wordpress.com/docs/api/1.1/get/sites/%24site/stats/top-posts/
  switch (searchPeriod) {
    case SEARCH_PERIOD.TODAY:
      return {
        period: 'day',
        num: 1,
      }
    case SEARCH_PERIOD.WEEK:
      return {
        period: 'day',
        num: 7,
      }
    case SEARCH_PERIOD.MONTH:
      return {
        period: 'day',
        num: 31,
      }
    case SEARCH_PERIOD.HALF_YEAR:
      return {
        period: 'day',
        num: 182,
      }
    case SEARCH_PERIOD.YEAR:
      return {
        period: 'day',
        num: 365,
      }
    default:
      throw Error(`Invalid search period : ${searchPeriod}`)
  }
}
