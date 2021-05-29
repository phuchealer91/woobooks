import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
} from '@ant-design/icons'
import { Form, Input } from 'antd'
import Button from 'antd/lib/button'
import React from 'react'
const FormUpdatePassword = () => {
  return (
    <React.Fragment>
      <div className="flex items-end">
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Mật khẩu không được để trống',
            },
            { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự.' },
          ]}
          name="password"
          className="mr-3 w-1/2"
        >
          <Input.Password
            prefix={<UserOutlined />}
            placeholder="Nhập mật khẩu của bạn"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            className="rounded py-2 text-base"
          />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            className="py-2 rounded font-semibold"
          >
            Cập nhật mật khẩu
          </Button>
        </Form.Item>
      </div>
    </React.Fragment>
  )
}
FormUpdatePassword.propTypes = {}

export default FormUpdatePassword
