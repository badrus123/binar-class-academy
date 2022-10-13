const express = require('express')
const router = express.Router()
const attendance = require('../controller/attendance')

/**
 * This function comment is parsed by doctrine
 * @route GET /attendance
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.get('/attendance', attendance.findAll)
/**
 * This function comment is parsed by doctrine
 * @route POST /attendance
 * @body {string} email.query.required - username or email
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post('/attendance', attendance.in)
/**
 * This function comment is parsed by doctrine
 * @route PUT /attendance
 * @body {string} email.query.required - username or email
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.put('/attendance/:id', attendance.out)

module.exports = router
