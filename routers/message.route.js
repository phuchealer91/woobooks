const express = require('express')
const router = express.Router()
const {
  createMessage,
  getConversation,
  getMessage,
  deleteConversation,
} = require('../controllers/message.controller')

const { isAuth, isAdmin } = require('../middlewares/auth')
router.post('/create-message', isAuth, createMessage)
router.get('/conversations', isAuth, getConversation)
router.get('/messages/:id', isAuth, getMessage)
router.delete('/conversation/:id', isAuth, deleteConversation)

module.exports = router
