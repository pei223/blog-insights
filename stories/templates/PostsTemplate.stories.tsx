import { storiesOf } from '@storybook/react'
import React from 'react'
import PostsTemplate from '../../src/components/templates/wordpresscom/posts_view/PostsTemplate'

const dummy = () => {}

storiesOf('templates/PostsTemplate', module)
  .add('default', () => (
    <PostsTemplate
      dataCountPerPage={10}
      loading={false}
      posts={[
        {
          id: 111,
          title: 'テスト',
          date: '2222',
          type: 'aaaaaa',
          href: 'aaaaaaa',
          views: 100,
        },
        {
          id: 111,
          title: 'テスト',
          date: '2222',
          type: 'aaaaaa',
          href: 'aaaaaaa',
          views: 100,
        },
        {
          id: 111,
          title: 'テスト',
          date: '2222',
          type: 'aaaaaa',
          href: 'aaaaaaa',
          views: 100,
        },
        {
          id: 111,
          title: 'テスト',
          date: '2222',
          type: 'aaaaaa',
          href: 'aaaaaaa',
          views: 100,
        },
        {
          id: 111,
          title: 'テスト',
          date: '2222',
          type: 'aaaaaa',
          href: 'aaaaaaa',
          views: 100,
        },
        {
          id: 111,
          title: 'テスト',
          date: '2222',
          type: 'aaaaaa',
          href: 'aaaaaaa',
          views: 100,
        },
      ]}
      page={2}
      maxPage={10}
      period={'week'}
      onPageChange={dummy}
      onPeriodChange={dummy}
    />
  ))
  .add('loading', () => (
    <PostsTemplate
      dataCountPerPage={10}
      loading={true}
      posts={[]}
      page={0}
      maxPage={0}
      period={'week'}
      onPageChange={dummy}
      onPeriodChange={dummy}
    />
  ))
  .add('no content', () => (
    <PostsTemplate
      dataCountPerPage={10}
      loading={false}
      posts={[]}
      page={0}
      maxPage={0}
      period={'week'}
      onPageChange={dummy}
      onPeriodChange={dummy}
    />
  ))
