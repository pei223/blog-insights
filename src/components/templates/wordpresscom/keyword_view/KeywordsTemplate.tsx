import {
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import {
  KeywordAccess,
  KeywordViewTarget,
  KEYWORD_VIEW_TARGET,
  sortKeywordsBy,
} from '../../../../interfaces/keywords/KeywordInfo'
import styles from '../../../../styles/templates/wordpresscom/keywordsTemplate.module.css'
import commonStyles from '../../../../styles/templates/wordpresscom/seeMore.module.css'
import { scrollToTop } from '../../../../utils/windowUtil'
import ScrollTopButton from '../../../atoms/common/ScrollTopButton'
import KeywordInfoRow from '../../../atoms/keyword_access/KeywordAccessRow'
import PagingNav from '../../../blocks/common/PagingNav'
import Layout from '../Layout'

type Props = {
  keywords?: KeywordAccess[]
  defaultPage: number
  defaultViewTarget: KeywordViewTarget
}

const DATA_PER_PAGE = 20

const KeywordsTemplate: React.FC<Props> = ({
  keywords,
  defaultPage,
  defaultViewTarget,
}) => {
  const router = useRouter()
  const [viewTarget, setViewTarget] =
    useState<KeywordViewTarget>(defaultViewTarget)
  const [page, setPage] = useState(defaultPage)

  const [sortedKeywords, setSortedKeywords] =
    useState<KeywordAccess[]>(keywords)

  const onLabelChange = (newViewType: KeywordViewTarget) => {
    if (!keywords) {
      return
    }
    setSortedKeywords(null)
    setViewTarget(newViewType)
  }

  useEffect(() => {
    setSortedKeywords(sortKeywordsBy(keywords, viewTarget))
    router?.replace(`/keywords?target=${viewTarget}&page=${page + 1}`)
  }, [keywords, viewTarget])

  const onPageChange = (num: number) => {
    router?.replace(`/keywords?target=${viewTarget}&page=${num + 1}`)
    setPage(num)
  }

  return (
    <Layout title="Keyword insights" heading="Keywords">
      <div className={commonStyles.content}>
        <FormControl variant="standard" className={styles.formArea}>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <InputLabel id="view-target-label">数値</InputLabel>
              <Select
                className={styles.targetSelect}
                labelId="view-target-label"
                label="数値"
                value={viewTarget}
                onChange={(e) => {
                  onLabelChange(e.target.value as KeywordViewTarget)
                  setPage(0)
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
            </Grid>
          </Grid>
        </FormControl>

        {keywords && (
          <PagingNav
            className={commonStyles.topPageNavContainer}
            selectedPage={page}
            maxPage={Math.ceil(keywords.length / DATA_PER_PAGE)}
            displayNum={2}
            onPageChanged={onPageChange}
          />
        )}

        <div className={commonStyles.listArea}>
          {sortedKeywords &&
            sortedKeywords
              .slice(page * DATA_PER_PAGE, (page + 1) * DATA_PER_PAGE)
              .map((keyword, i) => (
                <div key={keyword.keyword}>
                  <KeywordInfoRow
                    viewTarget={viewTarget}
                    rank={page * DATA_PER_PAGE + i + 1}
                    keywordInfo={keyword}
                  />
                  <Divider />
                </div>
              ))}
        </div>
        {!sortedKeywords && (
          <div className={commonStyles.loadingContainer}>
            <CircularProgress size={80} />
          </div>
        )}
        <ScrollTopButton
          className={commonStyles.scrollTopButton}
          onClick={() => scrollToTop(window)}
        />
      </div>
      {keywords && (
        <PagingNav
          className={commonStyles.bottomPageNavContainer}
          selectedPage={page}
          maxPage={Math.ceil(keywords.length / DATA_PER_PAGE)}
          displayNum={2}
          onPageChanged={onPageChange}
        />
      )}
    </Layout>
  )
}
export default KeywordsTemplate
