import classNames from 'classnames'

import styles from './clickable.module.scss'

interface IClickableProps {
  children: React.ReactNode
  className?: string
  onClick: (e: React.MouseEvent) => void
  href?: string
}

const Clickable = ({ children, className, onClick, href }: IClickableProps) => {
  return (
    <div
      className={classNames(styles.clickable, className)}
      onClick={(e: React.MouseEvent) => {
        if (href) {
          e.preventDefault()
          console.log('href', href)
        }
        //pass e as param in onclick on Parent
        onClick(e)
      }}
    >
      {children}
    </div>
  )
}

export default Clickable
