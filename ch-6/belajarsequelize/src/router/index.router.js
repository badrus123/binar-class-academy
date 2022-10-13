const express = require('express')
const router = express.Router()
const auth = require('./user.router')
const attendance = require('./attendance.router')

router.use(auth)
router.use(attendance)

module.exports = router
