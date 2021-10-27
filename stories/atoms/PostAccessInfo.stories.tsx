import { number, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import PostAccessInfoRow from '../../src/components/atoms/post_access/PostAccessRow'

storiesOf('atoms/PostAccessInfoRow', module).add('default', () => (
  <PostAccessInfoRow
    width={text('width', '300px')}
    rank={10}
    postInfo={{
      id: 12,
      href: 'aaa',
      date: '2020-11-11',
      type: 'get',
      title: text('title', 'hogehoge'),
      views: number('views', 100),
    }}
  />
))
