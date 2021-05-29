import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  MailOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import './RegisterComplete.scss'

const FormRegisterComplete = ({ email }) => {
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
        label="Email"
      >
        <Input
          placeholder="Nhập địa chỉ email"
          prefix={<MailOutlined />}
          disabled
          value={email}
          className="rounded text-base"
        />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: 'Mật khẩu không được để trống',
          },
          { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự.' },
        ]}
        name="password"
        label="Mật khẩu"
      >
        <Input.Password
          prefix={<UserOutlined />}
          placeholder="Nhập mật khẩu của bạn"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          className="rounded text-base"
        />
      </Form.Item>
    </>
  )
}
FormRegisterComplete.propTypes = {
  email: PropTypes.string,
}

export default FormRegisterComplete
