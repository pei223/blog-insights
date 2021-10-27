import { storiesOf } from '@storybook/react'
import React from 'react'
import SiteAccessGraphBlock from '../../src/components/blocks/site_access/SiteAccessGraphBlock'

storiesOf('blocks/PostAccessGraphBlock', module).add('default', () => (
  <SiteAccessGraphBlock
    siteAccessList={[
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
