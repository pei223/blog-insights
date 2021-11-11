import { Grid } from '@mui/material'
import React from 'react'
import { KeywordAccess } from '../../../../interfaces/keywords/KeywordInfo'
import { PostAccess } from '../../../../interfaces/wordpresscom/postAccess'
import { SiteAccess } from '../../../../interfaces/wordpresscom/siteAccess'
import { SiteInfo } from '../../../../interfaces/wordpresscom/siteInfo'
import styles from '../../../../styles/templates/wordpresscom/insightsTemplate.module.css'
import KeywordAccessInfoBlock from '../../../blocks/keyword_access/KeywordAccessBlock'
import PostAccessInfoBlock from '../../../blocks/post_access/PostAccessBlock'
import SiteAccessGraphBlock from '../../../blocks/site_access/SiteAccessGraphBlock'
import Layout from '../Layout'

type Props = {
  demoMode?: boolean
  siteInfo: SiteInfo
  postAccessRankingList: PostAccess[] | null
  keywordRankingList: KeywordAccess[] | null
  dailySiteAccessList: SiteAccess[] | null
}

const InsightsTemplate = ({
  demoMode = false,
  siteInfo,
  postAccessRankingList,
  keywordRankingList,
  dailySiteAccessList,
}: Props) => {
  return (
    <Layout
      demoMode={demoMode}
      title="insights - blog insights"
      heading={
        demoMode ? 'insights' : siteInfo ? `${siteInfo.name} insights` : '...'
      }
    >
      <div className={styles.statsGraphArea}>
        <SiteAccessGraphBlock
          className={styles.accessGraphArea}
          siteAccessList={dailySiteAccessList}
        />
      </div>
      <Grid container spacing={2}>
        <Grid item sm={7} xs={12}>
          <PostAccessInfoBlock
            demoMode={demoMode}
            className={styles.postAccessRankingArea}
            postInfoList={postAccessRankingList}
          />
        </Grid>
        <Grid item sm={5} xs={12}>
          <KeywordAccessInfoBlock
            demoMode={demoMode}
            className={styles.keywordRankingArea}
            keywordInfoList={keywordRankingList}
          />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default InsightsTemplate
