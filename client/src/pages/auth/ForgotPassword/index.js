import { Col, Form, Row } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth } from '../../../firebase'
import { useAuthUser } from '../../../hooks/useAuthUser'
import { hideLoading, showLoading } from '../../../redux/actions/ui'
import PATHS from '../../../redux/constants/paths'
import './ForgotPassword.scss'
import FormForgotPassword from './FormForgotPassword'
const ForgotPassword = (props) => {
  useAuthUser()
  const [form] = Form.useForm()
  const history = useHistory()
  const dispatch = useDispatch()

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

      toast.success(
        'Chúng tôi đã gửi yêu cầu khôi phục mật khẩu của bạn qua email. Vui lòng kiểm tra email !'
      )
      // redirect

      history.push(`${PATHS.HOME}`)
    } catch (error) {
      dispatch(hideLoading())
      toast.error(error.message)
    }
  }

  return (
    <div className="forgot-password">
      <Row className="forgot-password__wrap">
        <Col xs={24} sm={24} md={8} lg={8}>
          <h3> Khôi phục mật khẩu</h3>
          <Form form={form} onFinish={onFinish}>
            <FormForgotPassword />
          </Form>
        </Col>
      </Row>
    </div>
  )
}

ForgotPassword.propTypes = {}

export default ForgotPassword
