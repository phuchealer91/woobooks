const express = require('express')
const router = express.Router()
const {
  createFee,
  getFee,
  deleteFee,
} = require('../controllers/fee.controller')
const { isAuth, isAdmin } = require('../middlewares/auth')
router.post('/', isAuth, isAdmin, createFee)
router.get('/list', getFee)
router.delete('/:feeId', isAuth, isAdmin, deleteFee)

module.exports = router
