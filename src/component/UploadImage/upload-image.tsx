import { ChangeEvent, useEffect, useId, useRef, useState } from 'react'
import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form'
import classnames from 'classnames'

import { ErrorMessage } from '@/component'
import { FileUploadType } from '@/types/global'
import styles from './uploadImage.module.scss'

interface IInputImageProps {
  accept: string
  className?: string
  maxFiles?: number
  error?: FieldError
  value?: FileUploadType[]
  onChange: (files: FileUploadType[]) => void
}

const InputImageField = ({ className, value, onChange, maxFiles = 1, error = undefined, accept }: IInputImageProps) => {
  // id riêng cho mỗi ô upload để label không trỏ nhầm sang input khác trên cùng trang
  const inputId = useId()
  const [images, setImages] = useState<FileUploadType[]>(value || [])
  const imagesRef = useRef(images)
  imagesRef.current = images

  // đồng bộ khi form reset / setValue từ bên ngoài
  useEffect(() => {
    setImages(value || [])
  }, [value])

  // giải phóng object URL còn lại khi component bị gỡ
  useEffect(() => {
    return () => imagesRef.current.forEach((image) => URL.revokeObjectURL(image.urlPreview))
  }, [])

  const handleFiles = (filesReceived: File[]) => {
    if (images.length + filesReceived.length > maxFiles) return

    const filesUploaded: FileUploadType[] = filesReceived.map((file) => ({
      urlPreview: URL.createObjectURL(file),
      name: file.name,
      file
    }))
    const allFiles = [...images, ...filesUploaded]

    setImages(allFiles)
    onChange(allFiles)
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return

    handleFiles(Array.from(event.target.files))
    // cho phép chọn lại cùng một file sau khi đã xóa
    event.target.value = ''
  }

  const handleDeleteImage = (indexImage: number) => {
    URL.revokeObjectURL(images[indexImage].urlPreview)
    const newFiles = images.filter((_, index) => index !== indexImage)
    setImages(newFiles)
    onChange(newFiles)
  }

  return (
    <div className={classnames(styles.groupImagesUpload, className)}>
      {images.map((image, index) => (
        <div className={styles.imagePreview} key={image.urlPreview}>
          <div className={styles.customDelete}>
            <div className={styles.textDelete} onClick={() => handleDeleteImage(index)}>
              Delete
            </div>
          </div>
          <img src={image.urlPreview} alt={image.name} />
        </div>
      ))}
      <input
        className={styles.inputImage}
        id={inputId}
        type='file'
        accept={accept}
        multiple
        onChange={handleImageChange}
      />
      <label htmlFor={inputId} className={classnames(styles.buttonUpload, error && styles.imageError)}>
        <div className={styles.textUpload}>
          <div>+ Upload</div>
          <div>max {maxFiles} file(s)</div>
        </div>
      </label>
    </div>
  )
}

interface IUploadImage<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  maxFiles?: number
  accept?: string
  label?: string
  isRequired?: boolean
  className?: string
}

const UploadImage = <T extends FieldValues>({
  control,
  name,
  label,
  accept = 'image/gif, image/png, image/jpeg',
  isRequired = false,
  className,
  maxFiles
}: IUploadImage<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          {label && (
            <div className={styles.label}>
              {label}
              {isRequired && <span className='required-field'>*</span>}
            </div>
          )}
          <InputImageField
            className={className}
            maxFiles={maxFiles}
            value={field.value}
            onChange={field.onChange}
            accept={accept}
            error={error}
          />
          <ErrorMessage message={error?.message} />
        </>
      )}
    />
  )
}

export default UploadImage
