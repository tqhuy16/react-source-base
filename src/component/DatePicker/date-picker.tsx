import { DatePicker as AntdDatePicker, Space } from 'antd'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import { ErrorMessage } from '@/component'
import { DATE_FORMAT_LIST } from '@/constants/common'
import styles from './datePicker.module.scss'

dayjs.extend(customParseFormat)

interface IDatePickerProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  placeholder?: string
  isRequired?: boolean
  format?: string
}

// Giá trị lưu trong form là chuỗi theo `format` (mặc định DD/MM/YYYY), khớp với schema yup.string()
const DatePicker = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  isRequired = false,
  format = DATE_FORMAT_LIST[0]
}: IDatePickerProps<T>) => {
  return (
    <>
      {label && (
        <div className={styles.label}>
          {label}
          {isRequired && <span className='required-field'>*</span>}
        </div>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Space direction='vertical'>
              <AntdDatePicker
                placeholder={placeholder ?? format}
                format={format}
                value={value ? dayjs(value, format) : null}
                onChange={(_, dateString) => onChange(dateString || '')}
                status={error?.message && 'error'}
              />
            </Space>
            <ErrorMessage message={error?.message} />
          </>
        )}
      />
    </>
  )
}

export default DatePicker
