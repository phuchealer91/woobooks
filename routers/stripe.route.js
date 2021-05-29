const express = require('express')
const router = express.Router()
const { createPaymentIntent } = require('../controllers/stripe.controller')
const { isAuth } = require('../middlewares/auth')
router.post('/create-payment-intent', isAuth, createPaymentIntent)

module.exports = router
