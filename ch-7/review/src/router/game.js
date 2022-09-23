const express = require('express')
const router = express.Router()
const game = require('../controllers/game')
const middlewareAuth = require('../middlewares/auth.middleware')

router.get('/game/:roomId', middlewareAuth.isAdmin, game.gameView)

module.exports = router
