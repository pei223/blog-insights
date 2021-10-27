import { storiesOf } from '@storybook/react'
import React from 'react'
import KeywordsTemplate from '../../src/components/templates/wordpresscom/keyword_view/KeywordsTemplate'

storiesOf('templates/KeywordsTemplate', module)
  .add('default', () => (
    <KeywordsTemplate
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
  .add('loading', () => <KeywordsTemplate keywords={null} />)
