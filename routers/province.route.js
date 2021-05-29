const express = require('express')
const router = express.Router()

const {
  getProvinceDistrict,
  getProvinces,
} = require('../controllers/province.controller')
const { isAuth, isAdmin } = require('../middlewares/auth')
const { validatorCategory } = require('../helpers/Validator')

router.get('/list', getProvinces)
router.get('/district/:id', getProvinceDistrict)

module.exports = router
