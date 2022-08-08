const express = require('express')
const router = express.Router()
const MiddlewareAuth = require('../middleware/router-middleware')
const middleware = new MiddlewareAuth()

// router
router.get('/', middleware.isAuthenticated, (req, res) => {
  res.send('Hello World')
})

module.exports = router
