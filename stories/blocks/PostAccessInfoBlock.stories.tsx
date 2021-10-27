import { storiesOf } from '@storybook/react'
import React from 'react'
import PostAccessInfoBlock from '../../src/components/blocks/post_access/PostAccessBlock'
import styles from './PostAccessInfoBlock.module.css'

storiesOf('blocks/PostAccessInfoBlock', module).add('default', () => (
  <PostAccessInfoBlock
    className={styles.sample}
    postInfoList={[
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
  />
))
