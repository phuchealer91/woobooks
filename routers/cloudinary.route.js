const express = require('express')
const router = express.Router()

const {
  uploadImage,
  deleteImage,
} = require('../controllers/cloudinary.controller')
const { isAuth, isAdmin } = require('../middlewares/auth')

router.post('/uploadImages', isAuth, isAdmin, uploadImage)
router.post('/removeImage', isAuth, isAdmin, deleteImage)

module.exports = router
