import { storiesOf } from '@storybook/react'
import React from 'react'
import InsightsTemplate from '../../src/components/templates/wordpresscom/InsightsTemplate/InsightsTemplate'

storiesOf('templates/InsightsTemplate', module)
  .add('default', () => (
    <InsightsTemplate
      siteInfo={{
        name: '',
        url: '',
        description: '',
      }}
      keywordRankingList={[
        {
          keyword: 'test',
          postCount: 100,
          totalAccess: 1000,
          averagePostAccess: 1.5,
        },
        {
          keyword: 'test',
          postCount: 100,
          totalAccess: 1000,
          averagePostAccess: 1.5,
        },
        {
          keyword: 'test',
          postCount: 100,
          totalAccess: 1000,
          averagePostAccess: 1.5,
        },
        {
          keyword: 'test',
          postCount: 100,
          totalAccess: 1000,
          averagePostAccess: 1.5,
        },
        {
          keyword: 'test',
          postCount: 100,
          totalAccess: 1000,
          averagePostAccess: 1.5,
        },
      ]}
      postAccessRankingList={[
        {
          id: 12,
          href: 'aaa',
          date: '2020-11-11',
          type: 'get',
          title: 'hogehoge',
          views: 100,
        },
        {
          id: 12,
          href: 'aaa',
          date: '2020-11-11',
          type: 'get',
          title: 'hogehoge',
          views: 100,
        },
        {
          id: 12,
          href: 'aaa',
          date: '2020-11-11',
          type: 'get',
          title: 'hogehoge',
          views: 100,
        },
      ]}
      dailySiteAccessList={[
        {
          date: new Date(2021, 10, 11),
          views: 110,
          visitors: 100,
        },
        {
          date: new Date(2021, 10, 11),
          views: 110,
          visitors: 100,
        },
        {
          date: new Date(2021, 10, 11),
          views: 110,
          visitors: 100,
        },
        {
          date: new Date(2021, 10, 11),
          views: 110,
          visitors: 100,
        },
        {
          date: new Date(2021, 10, 11),
          views: 110,
          visitors: 100,
        },
        {
          date: new Date(2021, 10, 11),
          views: 110,
          visitors: 100,
        },
        {
          date: new Date(2021, 10, 11),
          views: 110,
          visitors: 100,
        },
      ]}
    />
  ))
  .add('loading', () => (
    <InsightsTemplate
      siteInfo={null}
      keywordRankingList={null}
      postAccessRankingList={null}
      dailySiteAccessList={null}
    />
  ))
