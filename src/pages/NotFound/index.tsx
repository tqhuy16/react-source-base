import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Button, PageContent } from '@/component'
import { ROUTER_PATH } from '@/constants/common'
import styles from './notFound.module.scss'

const NotFound = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('common')

  return (
    <PageContent>
      <div className={styles.wrapper}>
        <p className={styles.code}>404</p>
        <p className={styles.title}>{t('not_found.title')}</p>
        <p className={styles.description}>{t('not_found.description')}</p>
        <Button size='large' onClick={() => navigate(ROUTER_PATH.HOME)}>
          {t('not_found.back_home')}
        </Button>
      </div>
    </PageContent>
  )
}

export default NotFound
