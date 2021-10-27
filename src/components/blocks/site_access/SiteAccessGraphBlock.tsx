import { Card, CardContent, CircularProgress, Typography } from '@mui/material'
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { SiteAccess } from '../../../interfaces/wordpresscom/siteAccess'
import commonStyles from '../../../styles/blocks/insightsBlock.module.css'
import styles from '../../../styles/blocks/siteAccessGraphBlock.module.css'

type Props = {
  className?: string
  siteAccessList: SiteAccess[] | null
}

const SiteAccessGraphBlock: React.FC<Props> = ({
  className = '',
  siteAccessList,
}) => {
  const labels: string[] = []
  const values: number[] = []
  if (siteAccessList) {
    siteAccessList.forEach((access) => {
      labels.push(`${access.date.getMonth() + 1}/${access.date.getDate()}`)
      values.push(access.views)
    })
  }

  let diffText = '-'
  let diffTextStyle = styles.noDiff
  if (siteAccessList && siteAccessList.length >= 2) {
    const diffAccess =
      siteAccessList[siteAccessList.length - 1].views -
      siteAccessList[siteAccessList.length - 2].views
    diffText = diffAccess < 0 ? `${diffAccess}` : `+${diffAccess}`
    diffTextStyle = diffAccess < 0 ? styles.minusDiff : styles.plusDiff
  }

  return (
    <Card className={className}>
      <CardContent className={commonStyles.cardContainer}>
        <Typography variant="h6" component="h2" className={styles.heading}>
          <p>日別アクセス</p>
          <p>
            <span className={diffTextStyle}>{diffText}</span>
            <span className={styles.label}>access</span>
          </p>
        </Typography>
        {siteAccessList && (
          <Bar
            className={styles.graph}
            data={{
              labels: labels,
              datasets: [
                {
                  label: 'サイトアクセス数',
                  data: values,
                  backgroundColor: '#b39ddb',
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              responsive: true,
            }}
          />
        )}
      </CardContent>
      {!siteAccessList && (
        <div className={commonStyles.loadingContainer}>
          <CircularProgress className={commonStyles.loading} />
        </div>
      )}
    </Card>
  )
}

export default SiteAccessGraphBlock
