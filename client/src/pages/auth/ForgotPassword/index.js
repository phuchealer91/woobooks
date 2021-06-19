import { Form } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import SectionTitle from '../../../components/SectionTitle/SectionTitle'
import { auth } from '../../../firebase'
import { useAuthUser } from '../../../hooks/useAuthUser'
import { hideLoading, showLoading } from '../../../redux/actions/ui'
import './ForgotPassword.scss'
import FormForgotPassword from './FormForgotPassword'
const ForgotPassword = (props) => {
  useAuthUser()
  const [form] = Form.useForm()
  const history = useHistory()
  const dispatch = useDispatch()
  const [isSent, setIsSent] = useState(false)

  const onFinish = async ({ email }) => {
    dispatch(showLoading())

    if (!email) {
      toast.error('Email không được để trống')
    }
    try {
      const config = {
        // env trong React phải có prefix là: REACT_APP_
        url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
        handleCodeInApp: true,
      }
      await auth.sendPasswordResetEmail(email, config)
      dispatch(hideLoading())
      setIsSent(true)
      toast.success('Gửi yêu cầu khôi phục mật khẩu thành công')
      // redirect

      // history.push(`${PATHS.HOME}`)
    } catch (error) {
      setIsSent(false)
      dispatch(hideLoading())
      toast.error('Gửi yêu cầu khôi phục mật khẩu thất bại')
    }
  }

  return (
    <div className="md:mt-11 flex flex-col items-center justify-center">
      <div className="px-8 py-4 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <SectionTitle>Khôi phục mật khẩu</SectionTitle>
        <div className="text-xs text-red-500 my-2">
          Vui lòng điền địa chỉ Email mà bạn quên mật khẩu
        </div>
        <Form form={form} onFinish={onFinish}>
          <FormForgotPassword />
        </Form>
        {isSent && (
          <span className="text-xs text-green-500 my-2">
            Hệ thống đã gửi yêu cầu khôi phục mật khẩu của bạn qua Email. Vui
            lòng kiểm tra Email !
          </span>
        )}
      </div>
    </div>
  )
}

ForgotPassword.propTypes = {}

export default ForgotPassword
