const express = require('express')
const router = express.Router()
const { createComment } = require('../controllers/comment.controller')

const { isAuth, isAdmin } = require('../middlewares/auth')
router.post('/', isAuth, createComment)

module.exports = router
