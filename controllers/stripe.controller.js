const Cart = require('../models/cart.model')
const Product = require('../models/product.model')
const Coupon = require('../models/coupon.model')
const User = require('../models/user.model')
const stripe = require('stripe')(process.env.STRIPE_SECRET)
module.exports.createPaymentIntent = async (req, res) => {
  const { isCoupons } = req.body
  const user = await User.findOne({ email: req.user.email }).exec()
  const { cartTotal, totalAfterDiscount } = await Cart.findOne({
    orderedBy: user._id,
  }).exec()
  let totalCurrent = 0
  if (isCoupons && totalAfterDiscount) {
    totalCurrent = Math.round(totalAfterDiscount / 100)
  } else {
    totalCurrent = Math.round(cartTotal / 100)
  }
  // if (isCoupons && totalAfterDiscount) {
  //   totalCurrent = totalAfterDiscount * 100
  // } else {
  //   totalCurrent = cartTotal * 100
  // }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalCurrent,
    currency: 'usd',
  })

  res.send({
    clientSecret: paymentIntent.client_secret,
    cartTotal,
    totalAfterDiscount,
    payable: totalCurrent,
  })
}
