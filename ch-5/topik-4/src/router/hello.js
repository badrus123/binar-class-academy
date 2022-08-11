const express = require('express')
const router = express.Router()
const hello = require('../controller/hello')
const authMiddleware = require('../middleware/authentication')
router.get('/', hello.say)
router.get('/hello', authMiddleware.validate, hello.sayHello)

module.exports = router
