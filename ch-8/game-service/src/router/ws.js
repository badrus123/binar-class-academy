const express = require('express')
const router = express.Router()
const { joinGame } = require('../controller/gameController')
const { findAllWs } = require('../controller/roomController')
// router.ws('/game/:id', joinGame)
router.ws('/room', findAllWs)
router.ws('/game/:id', joinGame)

module.exports = router
