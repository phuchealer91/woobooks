const express = require('express')
const router = express.Router()
const {
  createOrUpdateUser,
  currentUser,
  getNotifications,
  notificationUpdate,
} = require('../controllers/auth.controller')

const { isAuth, isAdmin } = require('../middlewares/auth')
router.post('/create-or-update-user', isAuth, createOrUpdateUser)
router.get('/current-user', isAuth, currentUser)
router.get('/notification-update-order', isAuth, notificationUpdate)
router.post('/current-admin', isAuth, isAdmin, currentUser)
router.get('/get-notifications', isAuth, isAdmin, getNotifications)

module.exports = router
