const mongoose = require('mongoose')
const schema = mongoose.Schema
const { ObjectId } = mongoose.Schema

const orderSchema = new schema(
  {
    products: [
      {
        product: { type: ObjectId, ref: 'Product' },
        count: Number,
      },
    ],
    paymentIntent: {},
    deliveryAddress: {},
    applyCoupon: { type: ObjectId, ref: 'Coupon', required: false },
    orderStatus: {
      type: String,
      default: 'Đang chờ xác nhận',
      enum: ['Đang chờ xác nhận', 'Đang xử lý', 'Đã bàn giao', 'Hủy'],
    },
    orderedBy: { type: ObjectId, ref: 'User' },
    isCancel: Boolean,
  },
  { timestamps: true }
)

orderSchema.pre('save', function () {
  console.log('query criteria', orderSchema.getQuery())
})
const Order = mongoose.model('Order', orderSchema)
module.exports = Order
