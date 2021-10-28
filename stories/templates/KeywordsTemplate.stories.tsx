import { storiesOf } from '@storybook/react'
import React from 'react'
import KeywordsTemplate from '../../src/components/templates/wordpresscom/keyword_view/KeywordsTemplate'
import { KEYWORD_VIEW_TARGET } from '../../src/interfaces/keywords/KeywordInfo'

storiesOf('templates/KeywordsTemplate', module)
  .add('default', () => (
    <KeywordsTemplate
      defaultViewTarget={KEYWORD_VIEW_TARGET.AVERAGE_POST_ACCESS}
      defaultPage={0}
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
      defaultViewTarget={KEYWORD_VIEW_TARGET.AVERAGE_POST_ACCESS}
      defaultPage={0}
      keywords={null}
    />
  ))
