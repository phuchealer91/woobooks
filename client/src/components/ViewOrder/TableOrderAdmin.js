import { DeleteFilled, DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { Button, Tag } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { removeOrders } from '../../apis/order'
import { formatPriceReal } from '../../helpers/formatPrice'
import { ModalConfirm } from '../ModalConfirm'
import ViewOrderAdmin from './ViewOrderAdmin'

TableOrderAdmin.propTypes = {}

function TableOrderAdmin({ order, loadAllOrders }) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [orderIds, setOrderId] = useState('')

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }
  const closeModal = () => {
    setIsVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  function onHandleDelete(orderId) {
    setIsVisible(true)
    setOrderId(orderId)
  }
  function onHandleDeleteItem() {
    removeOrders({ orderId: orderIds, orderStatus: order.orderStatus })
      .then((res) => {
        toast.success(`Xóa đơn hàng thành công`)
        loadAllOrders()
        setIsVisible(false)
      })
      .catch((err) => {
        toast.error('Xóa đơn hàng thất bại')
        setIsVisible(false)
      })
  }
  return (
    <>
      <ModalConfirm
        showModal={isVisible}
        closeModal={closeModal}
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
                {order?.paymentIntent?.id.substring(0, 10)}
              </span>
            </div>
          </td>
          <td className="py-3 px-6 text-left">
            <ul className="list-disc text-xs">
              <li className="pb-1">Tên: {order?.deliveryAddress?.name}</li>
              <li className="pb-1">
                ĐC: {order?.deliveryAddress?.mainAddress}
              </li>
              <li className="pb-1">SĐT: {order?.deliveryAddress?.phone}</li>
            </ul>
          </td>
          <td className="py-3 px-6 text-center">
            <div className="">
              {formatPriceReal(order?.paymentIntent?.amount)}đ
            </div>
          </td>
          <td className="py-3 px-6 text-center">
            <span className="">
              {new Date(order?.paymentIntent?.created * 1000).toLocaleString()}
            </span>
          </td>
          <td className="py-3 px-6 text-center">
            {order?.orderStatus === 'Đang chờ xác nhận' ? (
              <Tag color="#999">{order?.orderStatus}</Tag>
            ) : order?.orderStatus === 'Đang xử lý' ? (
              <Tag color="orange-inverse">{order?.orderStatus}</Tag>
            ) : order?.orderStatus === 'Đã bàn giao' ? (
              <Tag color="green-inverse">{order?.orderStatus}</Tag>
            ) : (
              <Tag color="red-inverse">{order?.orderStatus}</Tag>
            )}
          </td>
          <td className="py-3 px-6 text-center">
            <div className="flex items-center justify-between">
              <EyeOutlined
                onClick={showModal}
                className="cursor-pointer mr-2"
                style={{ fontSize: '18px' }}
              />

              <DeleteFilled
                className="text-red-500 cursor-pointer"
                onClick={() => onHandleDelete(order._id)}
                style={{ fontSize: '18px' }}
              />
            </div>
          </td>
        </tr>
      </tbody>
      <Modal
        title="Chi tiết đơn hàng"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="80%"
        height="auto"
      >
        <ViewOrderAdmin order={order} loadAllOrders={loadAllOrders} />
      </Modal>
    </>
  )
}

export default TableOrderAdmin
