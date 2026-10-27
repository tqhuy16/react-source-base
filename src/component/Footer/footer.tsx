import { useTranslation } from 'react-i18next'

import styles from './footer.module.scss'

const Footer = (): JSX.Element => {
  const { t } = useTranslation('common')
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.content}>
        <div className={styles.brandBox}>
          <span className={styles.logo}>R</span>
          <div>
            <p className={styles.brand}>{t('header.title')}</p>
            <p className={styles.copyright}>
              © {currentYear}. {t('footer.rights')}
            </p>
          </div>
        </div>

        <p className={styles.madeWith}>
          {t('footer.made_with')} <span className={styles.heart}>♥</span> {t('footer.by', { author: 'tqhuy' })}
        </p>
      </div>
    </footer>
  )
}

export default Footer
