const express = require('express')
const router = express.Router()

const apiUserHistoryController = require('./../../controllers/api/userHistory.controller')

router.route('/user-history')
    .post(apiUserHistoryController.storeHistory)

module.exports = router