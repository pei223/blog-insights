import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  List,
  Typography,
} from '@mui/material'
import React from 'react'
import { PostAccess } from '../../../interfaces/wordpresscom/postAccess'
import styles from '../../../styles/blocks/insightsBlock.module.css'
import PostAccessInfoRow from '../../atoms/post_access/PostAccessRow'

type Props = {
  className?: string
  postInfoList: PostAccess[] | null
}

const PostAccessInfoBlock = ({ className, postInfoList }: Props) => {
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
                      <PostAccessInfoRow rank={index + 1} postInfo={postInfo} />
                      <Divider />
                    </div>
                  )
                })}
              </List>
            </div>
            <div className={styles.seeMoreArea}>
              <Button>もっと見る</Button>
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
