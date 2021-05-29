const mongoose = require('mongoose')
const schema = mongoose.Schema

const categorySchema = new schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: [3, 'Too short'],
      maxlength: [32, 'Too long'],
      text: true,
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  { timestamps: true }
)

const Categories = mongoose.model('Categories', categorySchema)
module.exports = Categories
