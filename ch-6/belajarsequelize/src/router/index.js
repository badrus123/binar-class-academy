const express = require('express')
const router = express.Router()
const auth = require('./auth')
const sekolah = require('./sekolah')

router.use(auth)
router.use(sekolah)

module.exports = router
