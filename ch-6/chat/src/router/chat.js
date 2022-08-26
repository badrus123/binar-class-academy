const express = require('express')
const router = express.Router()
const chat = require('../controllers/chat')
const middlewareAuth = require('../middleware/middlewareAuth')

router.get('/chat', middlewareAuth.isAuthenticated, chat.chatView)

module.exports = router
