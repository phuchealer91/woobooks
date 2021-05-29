const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const schema = mongoose.Schema

const supplierSchema = new schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Name is required',
      minlength: [2, 'Too short'],
      maxlength: [32, 'Too long'],
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    bio: {
      type: String,
      text: true,
    },
    products: [{ type: ObjectId, ref: 'Product' }],
  },
  { timestamps: true }
)

const Supplier = mongoose.model('Supplier', supplierSchema)
module.exports = Supplier
