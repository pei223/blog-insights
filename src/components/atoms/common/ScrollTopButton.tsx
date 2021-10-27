import { ArrowDropUp } from '@mui/icons-material'
import { Fab } from '@mui/material'
import React from 'react'
import styles from '../../../styles/atoms/common/scrollTopButton.module.css'

type Props = {
  onClick: () => void
  className?: string
}

const ScrollTopButton: React.FC<Props> = ({ onClick, className }) => {
  return (
    <Fab
      className={`${styles.button} ${className}`}
      size="small"
      onClick={onClick}
    >
      <ArrowDropUp />
    </Fab>
  )
}

export default ScrollTopButton
