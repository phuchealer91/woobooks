const express = require('express')
const router = express.Router()
const {
  userCart,
  getUserCart,
  emptyCart,
  saveUserAddress,
  applyCouponToCart,
  createOrder,
  getOrders,
  addWishList,
  getWishList,
  removeWishList,
  addAddress,
  getAddress,
  removeAddress,
  getAddressSelected,
  applyAddressToCart,
  getTotalOrdersStatus,
  getTotalUsers,
  searchUser,
  getUser,
  updateUser,
  follow,
  unfollow,
  userReceipt,
  getUserReceipt,
  userReceiptAccept,
  userReceiptUpdate,
  removeReceipt,
  getAllUser,
  deleteUser,
  suggestionsUser,
} = require('../controllers/user.controller')

const { isAuth, isAdmin } = require('../middlewares/auth')
router.post('/cart', isAuth, userCart)
router.get('/cart', isAuth, getUserCart)
router.post('/receipt', isAuth, userReceipt)
router.get('/receipt', isAuth, getUserReceipt)
router.put('/receipt', isAuth, userReceiptAccept)
router.put('/receipt-transaction', isAuth, userReceiptUpdate)
router.delete('/cart', isAuth, emptyCart)
router.post('/receipt-remove', isAuth, removeReceipt)
router.post('/cart/address', isAuth, applyAddressToCart)
// Coupon
router.post('/cart/coupon', isAuth, applyCouponToCart)
// order
router.post('/cart/order', isAuth, createOrder)
router.post('/cart/orders', isAuth, getOrders)
// get total status
router.post('/cart/totals/status', isAuth, getTotalOrdersStatus)

// wishlist
router.post('/wishlist', isAuth, addWishList)
router.post('/wishlists', isAuth, getWishList)
router.put('/wishlist/:productId', isAuth, removeWishList)

// addAddress
router.post('/address', isAuth, addAddress)
router.get('/address', isAuth, getAddress)
router.get('/address/:addressId', isAuth, getAddressSelected)
router.put('/address/:addressId', isAuth, removeAddress)

// get user
router.get('/total', isAuth, isAdmin, getTotalUsers)
router.post('/total-users', isAuth, isAdmin, getAllUser)
router.post('/delete-user', isAuth, isAdmin, deleteUser)
// get search
router.get('/search', isAuth, searchUser)
router.get('/:id', isAuth, getUser)
router.patch('/', isAuth, updateUser)
router.patch('/:id/follow', isAuth, follow)
router.patch('/:id/unfollow', isAuth, unfollow)
router.get('/suggestions/list', isAuth, suggestionsUser)

module.exports = router
