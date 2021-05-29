import { BarcodeOutlined } from '@ant-design/icons'
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
        label="Tên mã KM"
      >
        <Input
          prefix={<BarcodeOutlined />}
          placeholder="Nhập mã của bạn"
          className="rounded py-2 text-base w-1/2"
        />
      </Form.Item>
      <Form.Item
        label="Phần trăm KM (%)"
        rules={[{ required: true }]}
        name="discount"
      >
        <InputNumber
          placeholder="Nhập số (%) giảm giá "
          className="rounded py-2 text-base w-1/2"
        />
      </Form.Item>
      <Form.Item
        label="Hạn sử dụng"
        rules={[
          { type: 'object', required: true, message: 'Please select time!' },
        ]}
        name="expiry"
      >
        <DatePicker
          placeholder="Nhập hạn sử dụng"
          className="rounded py-2 text-base w-1/2"
          format={`YYYY-MM-DD HH:mm:ss`}
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
    </React.Fragment>
  )
}
FormCoupon.propTypes = {}

export default FormCoupon
