import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'

function ModalConfirm({
  showModal,
  onHandleDeleteItem,
  closeModal,
  title,
  categoryToDelete,
}) {
  return (
    <React.Fragment>
      <Modal
        title="Xác nhận"
        visible={showModal}
        onOk={onHandleDeleteItem}
        onCancel={closeModal}
        okText="Xóa"
        cancelText="Thoát"
      >
        <p>
          Khi bạn xóa một {title} <span className="color-red">không thể</span>{' '}
          khôi phục nó được !
        </p>
        <p>
          {' '}
          Bạn chắc chắn xóa {title} <strong>{categoryToDelete}</strong> không ?
        </p>
      </Modal>
    </React.Fragment>
  )
}

ModalConfirm.propTypes = {
  showModal: PropTypes.bool,
  onHandleDeleteItem: PropTypes.func,
  closeModal: PropTypes.func,
  title: PropTypes.string,
  categoryToDelete: PropTypes.string,
}

export default ModalConfirm
