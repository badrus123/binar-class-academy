const express = require('express')
const router = express.Router()

const homeController = require('./../controllers/home.controller')
const gamesController = require('./../controllers/games.controller')

const restrict = require('./../middlewares/restrict')

router.get('/', homeController.index)

router.get('/games', restrict, gamesController.index)

module.exports = router
