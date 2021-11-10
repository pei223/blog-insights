import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  List,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { KeywordAccess } from '../../../interfaces/keywords/KeywordInfo'
import styles from '../../../styles/blocks/insightsBlock.module.css'
import KeywordInfoRow from '../../atoms/keyword_access/KeywordAccessRow'

type Props = {
  demoMode?: boolean
  className?: string
  keywordInfoList: KeywordAccess[] | null
}

const KeywordInfoBlock = ({
  demoMode = false,
  className,
  keywordInfoList,
}: Props) => {
  const router = useRouter()
  return (
    <Card className={className} style={{ position: 'relative' }}>
      <CardContent className={styles.cardContainer}>
        <Typography variant="h6" component="h2" className={styles.heading}>
          Keyword週間アクセス
        </Typography>
        {keywordInfoList && (
          <>
            <div className={styles.list}>
              <List>
                <Divider />
                {keywordInfoList.map((keywordInfo, index) => {
                  return (
                    <div key={index}>
                      <KeywordInfoRow
                        demoMode={demoMode}
                        rank={index + 1}
                        keywordInfo={keywordInfo}
                      />
                      <Divider />
                    </div>
                  )
                })}
              </List>
            </div>
            <div className={styles.seeMoreArea}>
              <Button
                onClick={() =>
                  router.push(`/keywords${demoMode ? '?demoMode=true' : ''}`)
                }
              >
                もっと見る
              </Button>
            </div>
          </>
        )}
      </CardContent>
      {!keywordInfoList && (
        <div className={styles.loadingContainer}>
          <CircularProgress className={styles.loading} />
        </div>
      )}
    </Card>
  )
}
export default KeywordInfoBlock
