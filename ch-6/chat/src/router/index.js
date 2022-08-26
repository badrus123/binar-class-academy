const express = require('express')
const rootRouter = express.Router()
const auth = require('./authentication')
const game = require('./game')
const chat = require('./chat')
const home = require('../controllers/home')

rootRouter.use(auth)
rootRouter.use(game)
rootRouter.use(chat)

rootRouter.get('/', home.index)

module.exports = rootRouter
