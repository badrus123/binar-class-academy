const express = require('express')
const router = express.Router()
const auth = require('../controller/auth')

router.get('/login', auth.login)

module.exports = router
