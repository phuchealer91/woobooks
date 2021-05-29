import { AppstoreAddOutlined } from '@ant-design/icons'
import { Form, Input } from 'antd'
import Button from 'antd/lib/button'
import React from 'react'
const FormSubCategory = () => {
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
        >
          <Input
            prefix={<AppstoreAddOutlined />}
            placeholder="Nhập danh mục sản phẩm"
            className="rounded py-2 text-base mr-3"
          />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            className="mx-3 py-2 rounded font-semibold"
          >
            Thêm
          </Button>
        </Form.Item>
      </div>
    </React.Fragment>
  )
}
FormSubCategory.propTypes = {}

export default FormSubCategory
