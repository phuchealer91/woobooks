import { MailOutlined } from '@ant-design/icons'
import { Form, Input } from 'antd'
import Button from 'antd/lib/button'
import React from 'react'
// import './FormForgotPassword.scss'

const FormForgotPassword = (props) => {
  return (
    <>
      <Form.Item
        rules={[
          {
            type: 'email',
            message: 'Email không đúng định dạng',
          },
          {
            required: true,
            message: 'Email không được để trống',
          },
        ]}
        name="email"
        style={{ marginBottom: '8px' }}
      >
        <Input
          placeholder="Nhập địa chỉ email"
          prefix={<MailOutlined />}
          className="py-1 w-full"
        />
      </Form.Item>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 my-3">
        Gửi yêu cầu
      </button>
    </>
  )
}
FormForgotPassword.propTypes = {}

export default FormForgotPassword
