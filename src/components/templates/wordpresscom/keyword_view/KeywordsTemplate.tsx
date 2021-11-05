import {
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
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
import {
  KeywordAccess,
  KeywordViewTarget,
  KEYWORD_VIEW_TARGET,
} from '../../../../interfaces/keywords/KeywordInfo'
import styles from '../../../../styles/templates/wordpresscom/keywordsTemplate.module.css'
import commonStyles from '../../../../styles/templates/wordpresscom/seeMore.module.css'
import { scrollToTop } from '../../../../utils/windowUtil'
import ScrollTopButton from '../../../atoms/common/ScrollTopButton'
import KeywordInfoRow from '../../../atoms/keyword_access/KeywordAccessRow'
import PagingNav from '../../../blocks/common/PagingNav'
import Layout from '../Layout'

type Props = {
  loading: boolean
  keywords: KeywordAccess[]
  page: number
  maxPage: number
  viewTarget: KeywordViewTarget
  period: SearchPeriod
  excludeOnePost: boolean
  onPageChange: (page: number) => void
  onViewTargetChange: (target: KeywordViewTarget) => void
  onPeriodChange: (period: SearchPeriod) => void
  onExcludeOnePostChange: (excldue: boolean) => void
}

const KeywordsTemplate: React.FC<Props> = ({
  loading,
  keywords,
  page,
  maxPage,
  viewTarget,
  period,
  excludeOnePost,
  onPageChange,
  onViewTargetChange,
  onPeriodChange,
  onExcludeOnePostChange,
}) => {
  if (loading) {
    return (
      <Layout
        title="キーワードごとのアクセス数 - blog insights"
        heading="キーワードごとのアクセス数"
      >
        <div className={commonStyles.loadingContainer}>
          <CircularProgress size={80} />
        </div>
      </Layout>
    )
  }
  return (
    <Layout
      title="キーワードごとのアクセス数 - blog insights"
      heading="キーワードごとのアクセス数"
    >
      <div className={commonStyles.content}>
        <Grid container>
          <Grid item xs={6} sm={4}>
            <FormControl variant="standard" className={styles.formArea}>
              <InputLabel id="view-target-label">数値</InputLabel>
              <Select
                className={styles.targetSelect}
                labelId="view-target-label"
                label="数値"
                value={viewTarget}
                onChange={(e) => {
                  onViewTargetChange(e.target.value as KeywordViewTarget)
                }}
              >
                <MenuItem value={KEYWORD_VIEW_TARGET.AVERAGE_POST_ACCESS}>
                  アクセス数/記事
                </MenuItem>
                <MenuItem value={KEYWORD_VIEW_TARGET.POST_COUNT}>
                  記事数
                </MenuItem>
                <MenuItem value={KEYWORD_VIEW_TARGET.TOTAL_ACCESS}>
                  アクセス数
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
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
                <MenuItem value={SEARCH_PERIOD.WEEK}>1週間</MenuItem>
                <MenuItem value={SEARCH_PERIOD.MONTH}>1ヶ月間</MenuItem>
                <MenuItem value={SEARCH_PERIOD.HALF_YEAR}>半年間</MenuItem>
                <MenuItem value={SEARCH_PERIOD.YEAR}>1年間</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormGroup className={styles.excludeOnePostCheck}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={excludeOnePost}
                    onChange={(e) => onExcludeOnePostChange(e.target.checked)}
                  />
                }
                label="1記事のみのデータを除外"
              />
            </FormGroup>
          </Grid>
        </Grid>
        <PagingNav
          className={commonStyles.topPageNavContainer}
          selectedPage={page}
          maxPage={maxPage}
          displayNum={2}
          onPageChanged={onPageChange}
        />

        <div className={commonStyles.listArea}>
          {keywords.map((keyword, i) => (
            <div key={keyword.keyword}>
              <KeywordInfoRow
                viewTarget={viewTarget}
                rank={keywords.length * page + i + 1}
                keywordInfo={keyword}
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
export default KeywordsTemplate
