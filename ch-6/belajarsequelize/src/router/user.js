const express = require('express')
const router = express.Router()
const user = require('../controller/user')

router.get('/user', user.findAll)
router.post('/user', user.create)

module.exports = router
