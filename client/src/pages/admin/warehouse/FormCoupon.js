import { TagOutlined } from '@ant-design/icons'
import { DatePicker, Form, Input, InputNumber } from 'antd'
import Button from 'antd/lib/button'
import React from 'react'
const FormCoupon = () => {
  return (
    <React.Fragment>
      <Form.Item
        rules={[
          {
            required: true,
            message: 'Mã không được để trống',
          },
          { min: 6, message: 'Mã phải có ít nhất 6 ký tự.' },
          { max: 12, message: 'Mã tối đa có 12 ký tự.' },
        ]}
        name="name"
        label="Name code"
      >
        <Input prefix={<TagOutlined />} placeholder="Nhập mã của bạn" />
      </Form.Item>
      <Form.Item
        label="Discount (%)"
        rules={[{ required: true }]}
        name="discount"
      >
        <InputNumber placeholder="Nhập số (%) giảm giá " className="w-72" />
      </Form.Item>
      <Form.Item
        label="Expiry"
        rules={[
          { type: 'object', required: true, message: 'Please select time!' },
        ]}
        name="expiry"
      >
        <DatePicker
          placeholder="Nhập ngày hết hạn"
          className="w-72"
          format={`YYYY-MM-DD HH:mm:ss`}
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          Thêm
        </Button>
      </Form.Item>
    </React.Fragment>
  )
}
FormCoupon.propTypes = {}

export default FormCoupon
