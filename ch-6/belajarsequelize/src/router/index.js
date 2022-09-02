const express = require('express')
const router = express.Router()
const auth = require('./user')
const attendance = require('./attendance')

router.use(auth)
router.use(attendance)

module.exports = router
