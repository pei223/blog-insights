import { NextApiRequest, NextApiResponse } from 'next'
import { SiteStatsRes } from '../../../interfaces/wordpresscom/siteAccess'

const handler = (req: NextApiRequest, res: NextApiResponse<SiteStatsRes>) => {
  const result = {
    stats: {
      visitors_today: 403,
      visitors_yesterday: 492,
      // visitors: 50380,
      views_today: 541,
      views_yesterday: 643,
      // views_best_day: '2021-11-09',
      // views_best_day_total: 643,
      // views: 77630,
      // comments: 3,
      // posts: 132,
      // followers_blog: 1,
      // followers_comments: 0,
      // comments_per_month: 0,
      // comments_most_active_recent_day: '2021-05-24 05:31:19',
      // comments_most_active_time: '14:00',
      // comments_spam: 0,
      // categories: 83,
      // tags: 16,
      // shares: 0,
      // shares_twitter: 0,
      // shares_facebook: 0,
    },
    visits: {
      data: [
        ['2021-10-12', 582, 440],
        ['2021-10-13', 427, 332],
        ['2021-10-14', 511, 369],
        ['2021-10-15', 464, 342],
        ['2021-10-16', 174, 134],
        ['2021-10-17', 195, 141],
        ['2021-10-18', 519, 376],
        ['2021-10-19', 482, 378],
        ['2021-10-20', 520, 385],
        ['2021-10-21', 455, 356],
        ['2021-10-22', 430, 351],
        ['2021-10-23', 178, 133],
        ['2021-10-24', 129, 98],
        ['2021-10-25', 514, 397],
        ['2021-10-26', 539, 377],
        ['2021-10-27', 482, 373],
        ['2021-10-28', 514, 383],
        ['2021-10-29', 442, 341],
        ['2021-10-30', 177, 126],
        ['2021-10-31', 186, 138],
        ['2021-11-01', 497, 383],
        ['2021-11-02', 520, 405],
        ['2021-11-03', 262, 196],
        ['2021-11-04', 578, 416],
        ['2021-11-05', 504, 399],
        ['2021-11-06', 180, 146],
        ['2021-11-07', 224, 161],
        ['2021-11-08', 522, 392],
        ['2021-11-09', 643, 492],
        ['2021-11-10', 541, 403],
      ],
    },
  }
  res.status(200).send(result)
}

export default handler
