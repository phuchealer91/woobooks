const mongoose = require('mongoose')
const schema = mongoose.Schema

const feeSchema = new schema(
  {
    area: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    feeShipping: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)
const Fee = mongoose.model('Fee', feeSchema)
module.exports = Fee
