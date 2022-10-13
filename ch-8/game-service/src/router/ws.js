const express = require('express')
const router = express.Router()
const { joinGame } = require('../controller/gameController')
router.ws('/game/:id', joinGame)

module.exports = router
