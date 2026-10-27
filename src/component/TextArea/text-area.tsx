import { Input as AntInput } from 'antd'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

import classNames from 'classnames'

import { ErrorMessage } from '@/component'
import styles from './textArea.module.scss'

interface ITextAreaProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  className?: string
  placeholder?: string
  rows?: number
  isRequired?: boolean
}

const { TextArea: AntdTextArea } = AntInput

const TextArea = <T extends FieldValues>({
  name,
  control,
  label,
  className,
  placeholder,
  rows,
  isRequired = false
}: ITextAreaProps<T>) => {
  return (
    <>
      {label && (
        <div className={styles.label}>
          {label}
          {isRequired && <span className='required-field'>*</span>}
        </div>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <AntdTextArea
              status={error?.message && 'error'}
              {...field}
              placeholder={placeholder}
              rows={rows}
              className={classNames(styles.customTextArea, className)}
            />
            <ErrorMessage message={error?.message} />
          </>
        )}
      />
    </>
  )
}

export default TextArea
