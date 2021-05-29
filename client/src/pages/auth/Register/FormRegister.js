import { MailOutlined } from '@ant-design/icons'
import { Form, Input } from 'antd'
import React from 'react'
import './Register.scss'
const FormRegister = (props) => {
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
        label="Email"
      >
        <Input
          placeholder="Nhập địa chỉ email"
          prefix={<MailOutlined />}
          className="rounded text-base"
        />
      </Form.Item>
    </>
  )
}

export default FormRegister
