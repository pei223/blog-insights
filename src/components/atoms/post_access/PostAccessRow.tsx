import { ListItem } from '@mui/material'
import React from 'react'
import { PostAccess } from '../../../interfaces/wordpresscom/postAccess'
import commonStyles from '../InsightsRow.module.css'

type Props = {
  demoMode?: boolean
  width?: string
  rank: number
  postInfo: PostAccess
}

const PostAccessInfoRow = ({ width = '100%', rank, postInfo }: Props) => {
  return (
    <ListItem
      button
      style={{
        width: width,
      }}
    >
      <div className={commonStyles.rank}>{rank}&#046;</div>
      <div className={commonStyles.textArea}>
        <div className={commonStyles.title}>{postInfo.title}</div>
        <div className={commonStyles.number}>
          {postInfo.views}
          <span className={commonStyles.label}>views</span>
        </div>
      </div>
    </ListItem>
  )
}
export default PostAccessInfoRow
