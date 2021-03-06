import { ListItem } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import {
  KeywordAccess,
  KeywordViewTarget,
  KEYWORD_VIEW_TARGET,
} from '../../../interfaces/keywords/KeywordInfo'
import { roundDigit } from '../../../utils/numberUtil'
import commonStyles from '../InsightsRow.module.css'

type Props = {
  demoMode?: boolean
  width?: string
  rank: number
  keywordInfo: KeywordAccess
  viewTarget?: KeywordViewTarget
}

const KeywordInfoRow = ({
  demoMode = false,
  width = '100%',
  rank,
  keywordInfo,
  viewTarget = KEYWORD_VIEW_TARGET.AVERAGE_POST_ACCESS,
}: Props) => {
  const router = useRouter()
  const value =
    viewTarget === KEYWORD_VIEW_TARGET.AVERAGE_POST_ACCESS
      ? roundDigit(keywordInfo.averagePostAccess, 2)
      : viewTarget === KEYWORD_VIEW_TARGET.POST_COUNT
      ? keywordInfo.postCount
      : keywordInfo.totalAccess
  const label =
    viewTarget === KEYWORD_VIEW_TARGET.AVERAGE_POST_ACCESS
      ? 'access/post'
      : viewTarget === KEYWORD_VIEW_TARGET.POST_COUNT
      ? 'post'
      : 'access'
  return (
    <ListItem
      button
      style={{
        width: width,
      }}
      onClick={() =>
        router.push(
          `/keywords/${keywordInfo.keyword}${demoMode ? '?&demoMode=true' : ''}`
        )
      }
    >
      <div className={commonStyles.rank}>{rank}&#046;</div>
      <div className={commonStyles.textArea}>
        <div className={commonStyles.title}>{keywordInfo.keyword}</div>
        <div className={commonStyles.number}>
          {value}
          <span className={commonStyles.label}>{label}</span>
        </div>
      </div>
    </ListItem>
  )
}
export default KeywordInfoRow
