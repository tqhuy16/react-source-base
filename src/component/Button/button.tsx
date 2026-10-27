import classnames from 'classnames'

import { Typography } from '@/component'
import styles from './button.module.scss'

interface IProps {
  size?: 'small' | 'large'
  loading?: boolean
  rounded?: boolean
  disabled?: boolean
  square?: boolean
  // background: string
  // textColor?: string
  onClick?: (e: any) => void
  icon?: string
  className?: string
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
}

const Button = ({
  children,
  size,
  className,
  loading,
  onClick,
  // background,
  // textColor,
  icon,
  rounded,
  disabled,
  square,
  ...rest
}: IProps): JSX.Element => {
  return (
    <button
      {...rest}
      // chặn cả submit bằng phím Enter khi đang loading/disabled
      disabled={disabled || loading}
      // background={background}
      // textcolor={textColor}
      className={classnames(
        size && styles[size],
        loading && styles.loading,
        rounded && styles.rounded,
        square && styles.square,
        disabled && styles.disabled,
        styles.button,
        className
      )}
      onClick={loading || disabled ? () => null : onClick}
    >
      {icon && <img src={icon} alt='' />}
      <Typography>{children}</Typography>
    </button>
  )
}

export default Button
