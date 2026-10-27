import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { loginStorage } from '@/utils/authenticated-storage'
import { login } from '@/api/auth'
import { LOGIN_ACCESS_TOKEN, LOGIN_USER_NAME } from '@/constants/key-storage'
import { ROUTER_PATH } from '@/constants/common'
import { Button, PageContent, InputField, Toast } from '@/component'
import { validationLogin } from '@/shared/validation/login-validation'

import styles from './login.module.scss'

const initialValues = {
  userName: '',
  password: ''
}

interface IFormInput {
  userName: string
  password: string
}

const Login = (): JSX.Element => {
  const navigate = useNavigate()
  const { t } = useTranslation('error-messages')
  const [loading, setLoading] = useState(false)

  const { control, handleSubmit } = useForm<IFormInput>({
    mode: 'onSubmit',
    defaultValues: initialValues,
    resolver: yupResolver(validationLogin)
  })

  const onSubmit: SubmitHandler<IFormInput> = async (data, e) => {
    e?.preventDefault()
    try {
      setLoading(true)
      const { token } = await login(data)
      if (token) {
        loginStorage(LOGIN_ACCESS_TOKEN, token)
        loginStorage(LOGIN_USER_NAME, data.userName)
        navigate(ROUTER_PATH.HOME)
      }
      return
    } catch (error) {
      Toast('error', t(error.statusText))
    } finally {
      setLoading(false)
    }
  }

  // đã đăng nhập thì không cho quay lại trang login
  if (localStorage.getItem(LOGIN_ACCESS_TOKEN)) return <Navigate to={ROUTER_PATH.HOME} replace />

  return (
    <PageContent>
      <div className={styles.loginForm}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <p className={styles.title}>LOGIN</p>
          <div className={styles.fieldGroup}>
            <InputField label='Username (admin)' name='userName' control={control} />
            <InputField label='Password (123456)' name='password' control={control} isPassWord />
          </div>
          <div className={styles.actionBox}>
            <Button size='large' type='submit' loading={loading}>
              Login
            </Button>
          </div>
        </form>
      </div>
    </PageContent>
  )
}

export default Login
