import { CSSProperties } from 'react'
import styles from '../../../styles/atoms/common/arrow.module.css'

export type ArrowDirection = 'left' | 'right'

type Props = {
  className?: string
  size?: string
  thin?: string
  direction: ArrowDirection
  color: string
  onClick?: () => void
}

const Arrow: React.FC<Props> = ({
  className,
  size = '18px',
  thin = '4px',
  color,
  direction,
  onClick,
}) => {
  const styleMap: { [key: string]: CSSProperties } = {
    left: {
      width: size,
      height: size,
      borderLeft: `${thin} solid ${color}`,
      borderBottom: `${thin} solid ${color}`,
    },
    right: {
      width: size,
      height: size,
      borderTop: `${thin} solid ${color}`,
      borderRight: `${thin} solid ${color}`,
    },
  }
  return (
    <div
      onClick={onClick}
      className={`${styles.arrow} ${className}`}
      style={styleMap[direction]}
    ></div>
  )
}

export default Arrow
