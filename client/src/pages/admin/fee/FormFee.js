import { Form, InputNumber } from 'antd'
import Button from 'antd/lib/button'
import React from 'react'
const FormCoupon = () => {
  return (
    <React.Fragment>
      <Form.Item
        rules={[
          {
            required: true,
            message: 'Phí không được để trống',
          },
        ]}
        name="feeShipping"
        label="Phí vận chuyển"
      >
        <InputNumber
          placeholder="Nhập phí vận chuyển "
          className="rounded py-2 text-base w-1/2"
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
