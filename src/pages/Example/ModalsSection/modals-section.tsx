import { useRef } from 'react'

import { Button, Modal, Toast } from '@/component'
import type { IModalRef } from '@/component/Modal/modal'
import mockData from '@/utils/mock-api'

const ModalsSection = (): JSX.Element => {
  const confirmBoxRef = useRef<IModalRef>(null)
  const modalRef = useRef<IModalRef>(null)

  const onConfirmDelete = async () => {
    await mockData({ data: true, duration: 2000 })
    Toast('show', 'Record deleted')
  }

  return (
    <div className='example-section'>
      <div className='section-title'>Modal</div>
      <div className='section-body'>
        <div className='wrap-button'>
          <Button onClick={() => modalRef.current?.showModal()}>Open Modal</Button>
          <Button onClick={() => confirmBoxRef.current?.showModal()}>Show confirm box</Button>
        </div>
      </div>

      <Modal title='Modal!' ref={modalRef}>
        <p>Hello</p>
      </Modal>

      <Modal title='Confirm!' ref={confirmBoxRef} isConfirm={true} onOk={onConfirmDelete}>
        <p>Are you sure to delete a record</p>
      </Modal>
    </div>
  )
}

export default ModalsSection
