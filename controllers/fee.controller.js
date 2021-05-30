const slugify = require('slugify')
const Fee = require('../models/fee.model')

module.exports.createFee = async (req, res) => {
  const { area, feeShipping } = req.body
  const slug = slugify(area).toLowerCase()
  try {
    const fee = await new Fee({
      area,
      slug,
      feeShipping,
    }).save()
    return res.status(201).json({ fee })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}
module.exports.getFee = async (req, res) => {
  try {
    const fees = await Fee.find({}).sort({ createdAt: -1 }).exec()
    return res.status(200).json({ fee: fees })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}
module.exports.deleteFee = async (req, res) => {
  try {
    const { feeId } = req.params
    await Fee.findByIdAndRemove(feeId).exec()
    return res.status(200).json({ msg: 'Xóa thành công' })
  } catch (error) {
    console.log('error', error)
    return res.status(500).json({ Error: 'Server error' })
  }
}
