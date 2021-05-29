const express = require('express')
const router = express.Router()

const {
  getOrders,
  orderStatus,
  getTotalOrders,
  orderStatisticalFilters,
  orderStatisticalByDate,
  getOrdersCompleted,
  getTotalPriceDay,
  getTotalPriceWeek,
  getTotalPriceMonth,
  getTotalPriceYear,
  getTotalOrderStatusMonth,
  getTopSellers,
  getNewOrders,
  orderCancelStatus,
  removeOrder,
} = require('../controllers/order.controller')
const { isAuth, isAdmin } = require('../middlewares/auth')

router.post('/list', isAuth, isAdmin, getOrders)
router.get('/list/total', isAuth, isAdmin, getTotalOrders)
router.put('/order-status', isAuth, isAdmin, orderStatus)
router.put('/order-cancel-status', isAuth, orderCancelStatus)
router.post('/remove-order', isAuth, isAdmin, removeOrder)
router.post('/order-filters', isAuth, isAdmin, orderStatisticalFilters)
router.post('/order-by-date', isAuth, isAdmin, orderStatisticalByDate)
router.get('/order-completed', isAuth, isAdmin, getOrdersCompleted)
router.get('/order-price-today', isAuth, isAdmin, getTotalPriceDay)
router.get('/order-price-week', isAuth, isAdmin, getTotalPriceWeek)
router.get('/order-price-month', isAuth, isAdmin, getTotalPriceMonth)
router.get('/order-price-year', isAuth, isAdmin, getTotalPriceYear)
router.get('/order-status-month', isAuth, isAdmin, getTotalOrderStatusMonth)
router.get('/top-sellers', isAuth, isAdmin, getTopSellers)
router.get('/new-orders', isAuth, isAdmin, getNewOrders)

module.exports = router
