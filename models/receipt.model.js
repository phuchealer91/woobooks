const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const schema = mongoose.Schema

const receiptSchema = new schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: 'Product',
        },

        inQuatity: Number,
        inPrice: Number,
      },
    ],
    supplier: {
      type: ObjectId,
      ref: 'Supplier',
    },
    receiptTotal: Number,
    receiptPayment: Number,
    statusReceipt: Boolean,
    logs: [
      {
        transaction: { type: Number },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    orderedBy: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

const Receipt = mongoose.model('Receipt', receiptSchema)
module.exports = Receipt
