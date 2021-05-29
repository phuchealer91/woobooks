import { UserSwitchOutlined } from '@ant-design/icons'
import { Form, Input } from 'antd'
import React from 'react'
const FormAuthor = () => {
  return (
    <React.Fragment>
      <div>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Tác giả không được để trống',
            },
            { min: 3, message: 'Tác giả phải có ít nhất 3 ký tự.' },
            { max: 32, message: 'Tác giả tối đa có 32 ký tự.' },
          ]}
          name="name"
        >
          <Input
            prefix={<UserSwitchOutlined />}
            placeholder="Nhập tên tác giả"
            className="rounded text-base"
          />
        </Form.Item>
      </div>
    </React.Fragment>
  )
}
FormAuthor.propTypes = {}

export default FormAuthor
