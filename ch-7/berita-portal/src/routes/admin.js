const express = require('express')
const router = express.Router()
const admin = require('../controller/admin')
/* GET home page. */
router.get('/admin', admin.render)
router.post('/artikel', admin.create)
module.exports = router
