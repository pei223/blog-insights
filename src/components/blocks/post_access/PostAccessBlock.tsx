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
import { PostAccess } from '../../../interfaces/wordpresscom/postAccess'
import styles from '../../../styles/blocks/insightsBlock.module.css'
import PostAccessInfoRow from '../../atoms/post_access/PostAccessRow'

type Props = {
  demoMode?: boolean
  className?: string
  postInfoList: PostAccess[] | null
}

const PostAccessInfoBlock = ({
  demoMode = false,
  className,
  postInfoList,
}: Props) => {
  const router = useRouter()

  return (
    <Card className={className} style={{ position: 'relative' }}>
      <CardContent className={styles.cardContainer}>
        <Typography variant="h6" component="h2" className={styles.heading}>
          週間記事アクセス
        </Typography>
        {postInfoList && (
          <>
            <div className={styles.list}>
              <List>
                <Divider />
                {postInfoList.map((postInfo, index) => {
                  return (
                    <div key={index}>
                      <PostAccessInfoRow
                        demoMode={demoMode}
                        rank={index + 1}
                        postInfo={postInfo}
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
                  router.push(`/posts${demoMode ? '?&demoMode=true' : ''}`)
                }
              >
                もっと見る
              </Button>
            </div>
          </>
        )}
      </CardContent>
      {!postInfoList && (
        <div className={styles.loadingContainer}>
          <CircularProgress className={styles.loading} />
        </div>
      )}
    </Card>
  )
}
export default PostAccessInfoBlock
