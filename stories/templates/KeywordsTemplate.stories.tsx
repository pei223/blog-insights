import { storiesOf } from '@storybook/react'
import React from 'react'
import KeywordsTemplate from '../../src/components/templates/wordpresscom/keyword_view/KeywordsTemplate'
import { SEARCH_PERIOD } from '../../src/interfaces/commonInterfaces'
import { KEYWORD_VIEW_TARGET } from '../../src/interfaces/keywords/KeywordInfo'

const dummy = () => {}

storiesOf('templates/KeywordsTemplate', module)
  .add('default', () => (
    <KeywordsTemplate
      loading={false}
      viewTarget={KEYWORD_VIEW_TARGET.AVERAGE_POST_ACCESS}
      page={1}
      period={SEARCH_PERIOD.WEEK}
      maxPage={5}
      onPeriodChange={dummy}
      onViewTargetChange={dummy}
      onPageChange={dummy}
      keywords={[
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
    />
  ))
  .add('loading', () => (
    <KeywordsTemplate
      loading={true}
      viewTarget={KEYWORD_VIEW_TARGET.AVERAGE_POST_ACCESS}
      page={1}
      period={SEARCH_PERIOD.WEEK}
      maxPage={5}
      onPeriodChange={dummy}
      onViewTargetChange={dummy}
      onPageChange={dummy}
      keywords={[]}
    />
  ))
