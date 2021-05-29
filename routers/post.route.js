const express = require('express')
const router = express.Router()
const {
  createPost,
  getPosts,
  updatePost,
  likePost,
  unLikePost,
} = require('../controllers/post.controller')

const { isAuth, isAdmin } = require('../middlewares/auth')
router.post('/', isAuth, createPost)
router.get('/', isAuth, getPosts)
router.patch('/:id', isAuth, updatePost)
router.patch('/:id/like', isAuth, likePost)
router.patch('/:id/unlike', isAuth, unLikePost)

module.exports = router
