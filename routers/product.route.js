const express = require('express')
const router = express.Router()

const {
  createProduct,
  getListAllProducts,
  deleteProduct,
  getProduct,
  updateProduct,
  getListProducts,
  getProductsCount,
  getListRelated,
  productReivews,
  productSearchFilters,
  getProductsRating,
  getListProductSale,
} = require('../controllers/product.controller')
const { isAuth, isAdmin } = require('../middlewares/auth')
// const { validatorCategory } = require('../helpers/Validator')
// router.get('/list', getCategories)
// router.get('/:slug', getCategory)
// router.put('/:slug', validatorCategory(), isAuth, isAdmin, updateCategory)
// get ralated
router.get('/related/:productId', getListRelated)
router.get('/list/total', getProductsCount)
router.get('/list/:count', getListAllProducts)
router.get('/:slug', getProduct)
router.put('/:slug', isAuth, isAdmin, updateProduct)
// Rating
router.get('/reviews', getProductsRating)
router.put('/review/:productId', isAuth, productReivews)
// Search / Filters
router.post('/search/filters', productSearchFilters)
router.delete('/:slug', isAuth, isAdmin, deleteProduct)
router.post('/list', getListProducts)
router.post('/list-sale', getListProductSale)
router.post('/', isAuth, isAdmin, createProduct)

module.exports = router
