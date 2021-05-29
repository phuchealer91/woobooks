const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: false,
      maxlength: 100000,
    },

    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: 'Categories',
    },
    subs: [
      {
        type: ObjectId,
        ref: 'subCategories',
      },
    ],
    totalQuantity: { type: Number },
    quantity: { type: Number },
    pages: { type: Number, required: true, trim: true, maxlength: 5 },
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    sale: {
      type: Number,
      default: 0,
    },
    layout: {
      type: String,
      enum: ['Bìa Cứng', 'Bìa Mềm'],
    },
    lang: {
      type: String,
      enum: ['Tiếng Việt', 'Tiếng Anh'],
    },
    author: [{ type: ObjectId, ref: 'Author', required: true }],
    // nha cung cap
    supplier: { type: ObjectId, ref: 'Supplier', required: true },
    // nha xuat ban
    publisher: { type: String, required: true },
    // nam xuat ban
    publication: { type: Date, required: true },

    reviews: [
      {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        postedBy: { type: ObjectId, ref: 'User', required: true },
      },
    ],
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)
module.exports = Product
