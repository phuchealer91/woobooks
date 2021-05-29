const express = require('express')
const router = express.Router()
const {
  createCoupon,
  getCoupon,
  deleteCoupon,
} = require('../controllers/coupon.controller')
const { isAuth, isAdmin } = require('../middlewares/auth')
router.post('/', isAuth, isAdmin, createCoupon)
router.get('/list', getCoupon)
router.delete('/:couponId', isAuth, isAdmin, deleteCoupon)

module.exports = router
