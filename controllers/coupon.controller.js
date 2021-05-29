const Coupon = require('../models/coupon.model')

module.exports.createCoupon = async (req, res) => {
  try {
    const { name, expiry, discount } = req.body
    const coupon = await new Coupon({
      name,
      expiry,
      discount,
    }).save()
    return res.status(201).json({ coupon })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}
module.exports.getCoupon = async (req, res) => {
  try {
    const coupons = await Coupon.find({}).sort({ createdAt: -1 }).exec()
    return res.status(200).json({ coupon: coupons })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}
module.exports.deleteCoupon = async (req, res) => {
  try {
    const { couponId } = req.params
    await Coupon.findByIdAndRemove(couponId).exec()
    return res.status(200).json({ msg: 'Delete coupon success' })
  } catch (error) {
    return res.status(500).json({ Error: 'Server error' })
  }
}
