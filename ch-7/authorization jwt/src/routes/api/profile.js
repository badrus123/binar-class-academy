const express = require('express')
const router = express.Router()
const restrict = require('../../middlewares/restrict')
const apiUserController = require('./../../controllers/api/user.controller')
// API
router.get('/profile', restrict, apiUserController.profile)
router.post('/login', apiUserController.login)
module.exports = router
