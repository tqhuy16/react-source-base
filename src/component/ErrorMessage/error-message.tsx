import { useTranslation } from 'react-i18next'

interface IErrorMessageProps {
  message?: string
}

// message là key trong error-messages.json, chuỗi thường không có key sẽ hiển thị nguyên văn
const ErrorMessage = ({ message }: IErrorMessageProps) => {
  const { t } = useTranslation('error-messages')

  if (!message) return null
  return <p className='text-error'>{t(message, { nsSeparator: false, keySeparator: false })}</p>
}

export default ErrorMessage
