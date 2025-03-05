import { Modal } from 'antd'
import { useState, useImperativeHandle, forwardRef } from 'react'

const GlobalModal = ({ children, title, onOk, cancelText, okText }, ref) => {
  const [visable, setVisable] = useState(false)

  const open = () => {
    setVisable(true)
  }
  const close = () => {
    setVisable(false)
  }
  const handleOk = () => {
    close()
    onOk()
  }

  useImperativeHandle(ref, () => ({
    open,
    close
  }))

  return (
    <Modal
      title={title}
      centered
      open={visable}
      onOk={handleOk}
      onCancel={close}
      cancelText={cancelText || 'Cancel'}
      okText={okText || 'Confirm'}
    >
      {children}
    </Modal>
  )
}

export default forwardRef(GlobalModal)
