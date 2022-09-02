const express = require('express')
const router = express.Router()
const attendance = require('../controller/attendance')

router.get('/attendance', attendance.findAll)
router.post('/attendance', attendance.in)
router.put('/attendance/:id', attendance.out)

module.exports = router
