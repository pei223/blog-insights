import { number } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import KeywordsTemplate from '../../src/components/templates/wordpresscom/keyword_view/KeywordsTemplate'
import { SEARCH_PERIOD } from '../../src/interfaces/commonInterfaces'
import { KEYWORD_VIEW_TARGET } from '../../src/interfaces/keywords/KeywordInfo'

const dummy = () => {
  console.log('dummy')
}

storiesOf('templates/KeywordsTemplate', module)
  .add('default', () => (
    <KeywordsTemplate
      totalViews={200}
      loading={false}
      viewTarget={KEYWORD_VIEW_TARGET.AVERAGE_POST_ACCESS}
      page={number('page', 0)}
      period={SEARCH_PERIOD.WEEK}
      maxPage={5}
      dataCountPerPage={10}
      excludeOnePost={true}
      onPeriodChange={dummy}
      onViewTargetChange={dummy}
      onPageChange={dummy}
      onExcludeOnePostChange={dummy}
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
  .add('with heading', () => (
    <KeywordsTemplate
      totalViews={200}
      heading={<h1>キーワード一覧</h1>}
      loading={false}
      viewTarget={KEYWORD_VIEW_TARGET.AVERAGE_POST_ACCESS}
      page={0}
      period={SEARCH_PERIOD.WEEK}
      maxPage={5}
      dataCountPerPage={10}
      excludeOnePost={true}
      onPeriodChange={dummy}
      onViewTargetChange={dummy}
      onPageChange={dummy}
      onExcludeOnePostChange={dummy}
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
      ]}
    />
  ))
  .add('loading', () => (
    <KeywordsTemplate
      totalViews={200}
      loading={true}
      viewTarget={KEYWORD_VIEW_TARGET.AVERAGE_POST_ACCESS}
      page={1}
      dataCountPerPage={10}
      period={SEARCH_PERIOD.WEEK}
      maxPage={5}
      excludeOnePost={false}
      onPeriodChange={dummy}
      onViewTargetChange={dummy}
      onPageChange={dummy}
      keywords={[]}
      onExcludeOnePostChange={dummy}
    />
  ))
  .add('no content', () => (
    <KeywordsTemplate
      totalViews={200}
      loading={false}
      viewTarget={KEYWORD_VIEW_TARGET.AVERAGE_POST_ACCESS}
      page={1}
      dataCountPerPage={10}
      period={SEARCH_PERIOD.WEEK}
      maxPage={5}
      excludeOnePost={false}
      onPeriodChange={dummy}
      onViewTargetChange={dummy}
      onPageChange={dummy}
      keywords={[]}
      onExcludeOnePostChange={dummy}
    />
  ))
  .add('no content with heading', () => (
    <KeywordsTemplate
      totalViews={200}
      loading={false}
      heading={<h1>キーワード一覧</h1>}
      viewTarget={KEYWORD_VIEW_TARGET.AVERAGE_POST_ACCESS}
      page={1}
      dataCountPerPage={10}
      period={SEARCH_PERIOD.WEEK}
      maxPage={5}
      excludeOnePost={false}
      onPeriodChange={dummy}
      onViewTargetChange={dummy}
      onPageChange={dummy}
      keywords={[]}
      onExcludeOnePostChange={dummy}
    />
  ))
