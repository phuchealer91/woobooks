const Supplier = require('../models/supplier.model')
const Product = require('../models/product.model')
const slugify = require('slugify')
var { validationResult } = require('express-validator')
// const Product = require('../models/product.model')
module.exports.createSupplier = async (req, res) => {
  const { name } = req.body
  const slug = slugify(name).toLowerCase()
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg })
    }
    const supplierExists = await Supplier.findOne({ slug })
    if (supplierExists)
      return res.status(400).json({ error: 'Supplier đã tồn tại' })
    const newSupplier = new Supplier({
      name,
      slug,
    })
    await newSupplier.save()
    return res.status(201).json({ supplier: newSupplier })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
module.exports.getSupplier = async (req, res) => {
  const { slug } = req.params
  console.log('slugslugslugslugslug', req.params)
  try {
    const supplier = await Supplier.findOne({ slug }).exec()
    if (!supplier)
      return res.status(400).json({ error: 'Supplier không tồn tại' })
    // const products = await Product.find({ supplier })
    //   .populate('supplier')
    //   .exec()
    return res.status(200).json({ supplier })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
module.exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find().sort({ createdAt: -1 }).exec()
    if (!suppliers)
      return res.status(400).json({ error: 'Suppliers không tồn tại' })
    return res.status(200).json({ suppliers })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
module.exports.updateSupplier = async (req, res) => {
  const { name } = req.body
  const { slug } = req.params
  const slugUpdate = slugify(name).toLowerCase()
  try {
    const supplier = await Supplier.findOneAndUpdate(
      { slug: slug },
      { name, slug: slugUpdate },
      { new: true }
    )
    if (!supplier)
      return res.status(400).json({ error: 'Supplier không tồn tại' })
    return res.status(200).json({ supplier })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
module.exports.deleteSupplier = async (req, res) => {
  const { slug } = req.params
  try {
    const supplierDeleted = await Supplier.findOneAndDelete({
      slug: slug,
    })
    if (!supplierDeleted)
      return res.status(400).json({ error: 'Supplier không tồn tại' })
    return res
      .status(200)
      .json({ msg: `Xóa ${supplierDeleted.name} thành công` })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}

module.exports.getSupplierss = async (req, res) => {
  const { _id } = req.body
  try {
    const supplier = await Supplier.findOne({ _id }).exec()
    if (!supplier)
      return res.status(400).json({ error: 'Supplier không tồn tại' })
    const products = await Product.find({ supplier })
      .populate('supplier')
      .exec()
    return res.status(200).json({ products })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }
}
