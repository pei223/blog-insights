import React from 'react'
import styles from '../../../styles/blocks/common/pagingNav.module.css'
import Arrow from '../../atoms/common/Arrow'

type Props = {
  className?: string
  maxPage: number
  selectedPage: number
  displayNum: number
  onPageChanged: (page: number) => void
}

const PagingNav = ({
  className,
  maxPage,
  selectedPage,
  displayNum,
  onPageChanged,
}: Props) => {
  if (maxPage <= 1) {
    return <></>
  }

  const pageList = []
  for (
    let i = Math.max(selectedPage - displayNum, 0);
    i <= Math.min(selectedPage + displayNum, maxPage - 1);
    i++
  ) {
    pageList.push(i)
  }

  return (
    <div className={className}>
      <div className={styles.container}>
        <Arrow
          onClick={() =>
            0 <= selectedPage - 1 && onPageChanged(selectedPage - 1)
          }
          className={styles.arrow}
          color="#c4c4c4"
          size="12px"
          thin="3px"
          direction="left"
        />
        {pageList.map((page) => (
          <span
            className={`${styles.page} ${
              page === selectedPage && styles.selected
            }`}
            onClick={() => page !== selectedPage && onPageChanged(page)}
          >
            {page + 1}
          </span>
        ))}
        <Arrow
          onClick={() =>
            selectedPage + 1 < maxPage && onPageChanged(selectedPage + 1)
          }
          className={styles.arrow}
          color="#c4c4c4"
          size="12px"
          thin="3px"
          direction="right"
        />
      </div>
    </div>
  )
}
export default PagingNav
