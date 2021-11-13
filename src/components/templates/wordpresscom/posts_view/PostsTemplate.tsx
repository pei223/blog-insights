import {
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import React from 'react'
import {
  SearchPeriod,
  SEARCH_PERIOD,
} from '../../../../interfaces/commonInterfaces'
import { PostAccess } from '../../../../interfaces/wordpresscom/postAccess'
import styles from '../../../../styles/templates/wordpresscom/postsTemplate.module.css'
import commonStyles from '../../../../styles/templates/wordpresscom/seeMore.module.css'
import { scrollToTop } from '../../../../utils/windowUtil'
import ScrollTopButton from '../../../atoms/common/ScrollTopButton'
import PostAccessInfoRow from '../../../atoms/post_access/PostAccessRow'
import PagingNav from '../../../blocks/common/PagingNav'
import Layout from '../Layout'

type Props = {
  demoMode?: boolean
  loading: boolean
  posts: PostAccess[]
  totalViews: number
  page: number
  maxPage: number
  dataCountPerPage: number
  period: SearchPeriod
  onPageChange: (page: number) => void
  onPeriodChange: (period: SearchPeriod) => void
}

const PostsTemplate: React.FC<Props> = ({
  demoMode = false,
  loading,
  posts,
  totalViews,
  page,
  maxPage,
  dataCountPerPage,
  period,
  onPageChange,
  onPeriodChange,
}) => {
  if (loading) {
    return (
      <Layout
        demoMode={demoMode}
        title="記事ごとのアクセス数 - blog insights"
        heading="記事ごとのアクセス数"
      >
        <div className={commonStyles.loadingContainer}>
          <CircularProgress size={80} />
        </div>
      </Layout>
    )
  }

  const searchConditionArea = (
    <Grid container>
      <Grid item xs={12} sm={8}>
        <FormControl variant="standard" className={styles.formArea}>
          <InputLabel id="period-label">期間</InputLabel>
          <Select
            className={styles.periodSelect}
            labelId="period-label"
            label="期間"
            value={period}
            onChange={(e) => {
              onPeriodChange(e.target.value as SearchPeriod)
            }}
          >
            <MenuItem value={SEARCH_PERIOD.TODAY}>今日</MenuItem>
            <MenuItem value={SEARCH_PERIOD.YESTERDAY}>昨日</MenuItem>
            <MenuItem value={SEARCH_PERIOD.WEEK}>1週間</MenuItem>
            <MenuItem value={SEARCH_PERIOD.MONTH}>1ヶ月間</MenuItem>
            <MenuItem value={SEARCH_PERIOD.HALF_YEAR}>半年間</MenuItem>
            <MenuItem value={SEARCH_PERIOD.YEAR}>1年間</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )

  if (posts.length === 0) {
    return (
      <Layout
        demoMode={demoMode}
        title="記事ごとのアクセス数 - blog insights"
        heading="記事ごとのアクセス数"
      >
        <div className={commonStyles.content}>
          {searchConditionArea}
          <div className={commonStyles.noContent}>
            該当するデータはありません。
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout
      demoMode={demoMode}
      title="記事ごとのアクセス数 - blog insights"
      heading="記事ごとのアクセス数"
    >
      <div className={commonStyles.content}>
        <p className={commonStyles.accessCountRow}>
          <span className={commonStyles.accessCount}>{totalViews}</span>total
          views
        </p>
        {searchConditionArea}
        <PagingNav
          className={commonStyles.topPageNavContainer}
          selectedPage={page}
          maxPage={maxPage}
          displayNum={2}
          onPageChanged={onPageChange}
        />

        <div className={commonStyles.listArea}>
          {posts.map((post, i) => (
            <div key={post.title}>
              <PostAccessInfoRow
                demoMode={demoMode}
                rank={dataCountPerPage * page + i + 1}
                postInfo={post}
              />
              <Divider />
            </div>
          ))}
        </div>

        <PagingNav
          className={commonStyles.bottomPageNavContainer}
          selectedPage={page}
          maxPage={maxPage}
          displayNum={2}
          onPageChanged={onPageChange}
        />
        <ScrollTopButton
          className={commonStyles.scrollTopButton}
          onClick={() => scrollToTop(window)}
        />
      </div>
    </Layout>
  )
}
export default PostsTemplate
