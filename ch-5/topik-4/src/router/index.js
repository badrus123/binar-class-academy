var express = require('express')
var rootRouter = express.Router()
const hello = require('./hello')
const auth = require('./auth')
rootRouter.use(hello)
rootRouter.use(auth)
module.exports = rootRouter
