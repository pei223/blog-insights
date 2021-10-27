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
  siteInfo: SiteInfo
  postAccessRankingList: PostAccess[] | null
  keywordRankingList: KeywordAccess[] | null
  dailySiteAccessList: SiteAccess[] | null
}

const InsightsTemplate = ({
  siteInfo,
  postAccessRankingList,
  keywordRankingList,
  dailySiteAccessList,
}: Props) => {
  return (
    <Layout
      title="Blog insights"
      heading={siteInfo ? `${siteInfo.name} insights` : '...'}
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
            className={styles.postAccessRankingArea}
            postInfoList={postAccessRankingList}
          />
        </Grid>
        <Grid item sm={5} xs={12}>
          <KeywordAccessInfoBlock
            className={styles.keywordRankingArea}
            keywordInfoList={keywordRankingList}
          />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default InsightsTemplate
