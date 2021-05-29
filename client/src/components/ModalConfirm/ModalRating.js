import { StarOutlined } from '@ant-design/icons'
import { Form } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { productRating } from '../../redux/actions/product'

function ModalRating({ children, productId }) {
  const [form] = Form.useForm()
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => ({ ...state }))
  let history = useHistory()
  let { slug } = useParams()
  function handleModal() {
    if (user && user.token) {
      setIsOpen(true)
    } else {
      history.push({
        pathname: '/login',
        state: { from: `/product/${slug}` },
      })
    }
  }
  function onFinish(value) {
    let values = { ...value, productId }
    dispatch(productRating(values))
  }
  function onHandleSubmit() {
    form.submit()
    setIsOpen(false)
    toast.success('Thanks for your review. It will apper soon')
  }
  return (
    <>
      <button
        onClick={handleModal}
        className="bg-white border border-solid flex items-center px-4 py-3 font-semibold  border-blue-600 rounded text-blue-600 hover:bg-blue-600 hover:text-white transaction"
      >
        <StarOutlined
          className="text-blue-600 pr-2 hover:text-white"
          style={{ fontSize: '16px' }}
        />{' '}
        <br />{' '}
        {user && user.token ? (
          <span>Để lại đánh giá</span>
        ) : (
          <span>Đăng nhập để đánh giá</span>
        )}
      </button>
      <Modal
        title="Đánh giá sản phẩm"
        centered
        visible={isOpen}
        onOk={onHandleSubmit}
        onCancel={() => setIsOpen(false)}
        className="pt-1"
      >
        <Form form={form} onFinish={onFinish}>
          {children}
        </Form>
      </Modal>
    </>
  )
}
ModalRating.propTypes = {}

export default ModalRating
