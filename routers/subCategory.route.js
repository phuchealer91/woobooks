const express = require('express')
const router = express.Router()

const {
  createSubCategory,
  getSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory,
} = require('../controllers/subCategory.controller')
const { isAuth, isAdmin } = require('../middlewares/auth')
const { validatorSubCategory } = require('../helpers/Validator')
router.get('/list', getSubCategories)
router.get('/:slug', getSubCategory)
router.put('/:slug', validatorSubCategory(), isAuth, isAdmin, updateSubCategory)
router.delete(
  '/:slug',
  validatorSubCategory(),
  isAuth,
  isAdmin,
  deleteSubCategory
)
router.post('/', validatorSubCategory(), isAuth, isAdmin, createSubCategory)

module.exports = router
