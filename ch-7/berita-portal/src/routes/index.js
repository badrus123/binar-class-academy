const express = require('express')
const router = express.Router()
const home = require('../controller/home')
const admin = require('./admin')
/* GET home page. */
router.get('/', home.render)
router.get('/berita/:slug', home.detail)
router.use(admin)
module.exports = router
