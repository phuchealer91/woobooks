const Author = require('../models/author.model')
const slugify = require('slugify')
var { validationResult } = require('express-validator')
// const Product = require('../models/product.model')
module.exports.createAuthor = async (req, res) => {
  const { name, bio } = req.body
  const slug = slugify(name).toLowerCase()
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg })
    }
    const authorExists = await Author.findOne({ slug })
    if (authorExists)
      return res.status(400).json({ error: `${name} đã tồn tại` })
    const newAuthor = new Author({
      name,
      bio,
      slug,
    })
    await newAuthor.save()
    return res.status(201).json({ author: newAuthor })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
module.exports.getAuthor = async (req, res) => {
  const { slug } = req.params
  try {
    const author = await Author.findOne({ slug }).exec()
    if (!author) return res.status(400).json({ error: 'Author không tìm thấy' })
    // get related products
    // const products = await Product.find({ category })
    //   .populate('category')
    //   .exec()
    // return res.status(200).json({ category, products: { data: products } })
    return res.status(200).json({ author })
  } catch (error) {}
}
module.exports.getAuthors = async (req, res) => {
  try {
    const authors = await Author.find().sort({ createdAt: -1 }).exec()
    if (!authors)
      return res.status(400).json({ error: 'Authors không tìm thấy' })
    return res.status(200).json({ authors })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
module.exports.updateAuthor = async (req, res) => {
  const { name, bio } = req.body
  const { slug } = req.params
  const slugUpdate = slugify(name).toLowerCase()
  const authorExists = await Author.findOne({ slug: slugUpdate })
  if (authorExists) return res.status(400).json({ error: `${name} đã tồn tại` })
  try {
    const author = await Author.findOneAndUpdate(
      { slug: slug },
      { name, bio, slug: slugUpdate },
      { new: true }
    )
    if (!author) return res.status(400).json({ error: 'Author không tìm thấy' })

    return res.status(200).json({ author })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
module.exports.deleteAuthor = async (req, res) => {
  const { slug } = req.params
  try {
    const authorDeleted = await Author.findOneAndDelete({
      slug: slug,
    })
    if (!authorDeleted)
      return res.status(400).json({ error: 'Author không tìm thấy' })
    return res.status(200).json({ msg: `Xóa ${authorDeleted.name} thành công` })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
