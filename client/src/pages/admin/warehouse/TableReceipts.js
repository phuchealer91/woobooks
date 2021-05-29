import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React, { useState } from 'react'
import ViewReceipts from './ViewReceipts'
import ViewTransaction from './ViewTransaction'
import { toast } from 'react-toastify'
import { removeReceipts } from '../../../apis/cart'
import { ModalConfirm } from '../../../components/ModalConfirm'
TableReceipts.propTypes = {}

function TableReceipts({ receipt, idx, loadUserReceipts }) {
  console.log('hello', receipt._id)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isConfirm, setIsConfirm] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }
  const showModalPay = () => {
    setIsVisible(true)
  }

  const onHandlePayment = () => {
    setIsVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const onhandleCancel = () => {
    setIsVisible(false)
  }
  function onHandleRemove() {
    setIsConfirm(true)
  }
  function onHandleDeleteItem() {
    removeReceipts(receipt)
      .then((res) => {
        if (res.data) {
          setIsConfirm(false)
          toast.success('Xóa thành công.')
          loadUserReceipts()
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  return (
    <>
      <ModalConfirm
        showModal={isConfirm}
        closeModal={() => setIsConfirm(false)}
        onHandleDeleteItem={onHandleDeleteItem}
        title="đơn hàng"
        categoryToDelete=""
      />
      <tbody className="text-gray-600 text-sm font-light">
        <tr className="border-b border-gray-200 hover:bg-gray-100">
          <td className="py-3 px-6 text-left whitespace-nowrap">
            <div className="flex items-center">
              <span className="font-medium">
                {' '}
                {receipt?._id.substring(0, 10)}
              </span>
            </div>
          </td>
          <td className="py-3 px-6 text-left">
            <div className="flex items-center">
              <span>{receipt?.supplier?.name.substring(0, 20)}</span>
            </div>
          </td>
          <td className="py-3 px-6 text-center">
            <span className="">
              {new Date(receipt.createdAt).toLocaleString()}
            </span>
          </td>
          <td className="py-3 px-6 text-center">
            {/* {formatPrice(order?.paymentIntent?.amount)}đ */}
            <span>
              {receipt.statusReceipt === true ? (
                <Tag color="green">Đã duyệt</Tag>
              ) : (
                <Tag color="red">Chưa duyệt</Tag>
              )}
            </span>
          </td>
          <td className="py-3 px-6 text-center">
            <div
              className="flex item-center justify-center cursor-pointer"
              onClick={showModal}
            >
              <EyeOutlined className="cursor-pointer" />
            </div>
          </td>
          <td className="py-3 px-6 text-center">
            <span className="px-2 cursor-pointer" onClick={showModalPay}>
              {' '}
              <EditOutlined style={{ color: 'green' }} />
            </span>
            <span className="px-2 cursor-pointer" onClick={onHandleRemove}>
              {' '}
              <DeleteOutlined style={{ color: 'red' }} />
            </span>
          </td>
        </tr>
      </tbody>
      <Modal
        title="Chi tiết đơn hàng"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width="80%"
        height="auto"
      >
        <ViewReceipts
          receipt={receipt}
          idx={idx}
          loadUserReceipts={loadUserReceipts}
        />
      </Modal>
      <Modal
        title="Cập nhật đơn đặt hàng"
        visible={isVisible}
        onOk={onHandlePayment}
        onCancel={onhandleCancel}
        width="80%"
        height="auto"
        footer={null}
      >
        <ViewTransaction
          receipt={receipt}
          idx={idx}
          loadUserReceipts={loadUserReceipts}
        />
      </Modal>
    </>
  )
}

export default TableReceipts
