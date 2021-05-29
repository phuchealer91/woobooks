import { AppstoreOutlined } from '@ant-design/icons'
import { Form, Input } from 'antd'
import Button from 'antd/lib/button'
import React from 'react'
const FormCategory = () => {
  return (
    <React.Fragment>
      <div className="flex items-center">
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Danh mục không được để trống',
            },
            { min: 3, message: 'Danh mục phải có ít nhất 3 ký tự.' },
            { max: 32, message: 'Danh mục tối đa có 32 ký tự.' },
          ]}
          name="name"
          className="mr-3"
        >
          <Input
            prefix={<AppstoreOutlined />}
            placeholder="Nhập loại sản phẩm"
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
            Thêm
          </Button>
        </Form.Item>
      </div>
    </React.Fragment>
  )
}
FormCategory.propTypes = {}

export default FormCategory
