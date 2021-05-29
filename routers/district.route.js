const express = require('express')
const router = express.Router()

const { getDistrictWard } = require('../controllers/district.controller')
const { isAuth, isAdmin } = require('../middlewares/auth')
const { validatorCategory } = require('../helpers/Validator')

router.get('/ward/:id', getDistrictWard)

module.exports = router
