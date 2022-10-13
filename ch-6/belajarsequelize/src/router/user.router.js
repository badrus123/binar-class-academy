const express = require('express')
const router = express.Router()
const user = require('../controller/user')
/**
 * This function comment is parsed by doctrine
 * @route GET /user
 * @body {string} email.query.required - username or email
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.get('/user', user.findAll)
/**
 * This function comment is parsed by doctrine
 * @route POST /user
 * @body {string} email.query.required - username or email
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post('/user', user.create)

module.exports = router
