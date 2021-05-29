const express = require('express')
const router = express.Router()

const {
  createAuthor,
  getAuthor,
  getAuthors,
  updateAuthor,
  deleteAuthor,
} = require('../controllers/author.controller')
const { isAuth, isAdmin } = require('../middlewares/auth')
const { validatorAuthor } = require('../helpers/Validator')
router.get('/list', getAuthors)
router.get('/:slug', getAuthor)
router.put('/:slug', validatorAuthor(), isAuth, isAdmin, updateAuthor)
router.delete('/:slug', validatorAuthor(), isAuth, isAdmin, deleteAuthor)
router.post('/', validatorAuthor(), isAuth, isAdmin, createAuthor)

module.exports = router
