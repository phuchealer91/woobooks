const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const schema = mongoose.Schema

const subCategorySchema = new schema(
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
    parent: { type: ObjectId, ref: 'Categories', required: true },
  },
  { timestamps: true }
)

const subCategories = mongoose.model('subCategories', subCategorySchema)
module.exports = subCategories
