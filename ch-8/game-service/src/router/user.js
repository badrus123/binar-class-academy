const express = require('express')
const router = express.Router()
const { login, register, findOne } = require('../controller/userController')
const auth = require('../middleware/authMiddleware')
router.post('/register', register)
router.post('/login', login)
router.get('/profile', auth, findOne)

module.exports = router
