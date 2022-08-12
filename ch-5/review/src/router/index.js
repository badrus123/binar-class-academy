const express = require('express')
const rootRouter = express.Router()
const auth = require('./authentication')
const game = require('./game')
const home = require('../controllers/home')

rootRouter.use(auth)
rootRouter.use(game)

rootRouter.get('/', home.index)

module.exports = rootRouter
