import { useState, forwardRef, useImperativeHandle } from 'react'
import { Modal as AntdModal } from 'antd'

interface IModalProps {
  children: React.ReactNode
  title?: string
  isConfirm?: boolean
  okText?: string
  cancelText?: string
  // nếu trả về Promise, modal hiện loading tới khi xong rồi mới đóng
  onOk?: () => void | Promise<void>
  onCancel?: () => void
}

interface IModalRef {
  showModal: () => void
  hideModal: () => void
}

const Modal = forwardRef<IModalRef, IModalProps>(
  ({ children, title, isConfirm = false, okText = 'OK', cancelText = 'Close', onOk, onCancel }, ref) => {
    const [open, setOpen] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)

    useImperativeHandle(ref, () => {
      return {
        showModal: () => setOpen(true),
        hideModal: () => setOpen(false)
      }
    }, [])

    const handleOk = async () => {
      try {
        setConfirmLoading(true)
        await onOk?.()
        setOpen(false)
      } finally {
        setConfirmLoading(false)
      }
    }

    const handleCancel = () => {
      setOpen(false)
      onCancel?.()
    }

    return !isConfirm ? (
      <AntdModal title={title} open={open} onCancel={handleCancel} footer={null}>
        {children}
      </AntdModal>
    ) : (
      <AntdModal
        title={title}
        open={open}
        confirmLoading={confirmLoading}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={okText}
        cancelText={cancelText}
      >
        {children}
      </AntdModal>
    )
  }
)

Modal.displayName = 'Modal'

export type { IModalRef }
export default Modal
