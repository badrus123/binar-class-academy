const express = require('express')
const router = express.Router()

// FE
const userRoute = require('./user.route')
const commonRoute = require('./common.route')
const apiUserRoute = require('./api/user.route')
const apiUserHistoryRoute = require('./api/userHistory.route')
const apiProfileRoute = require('./api/profile')
// Admin Routes
const dashboardUserRoute = require('./dashboard/user.route')

router.use(userRoute)
router.use(commonRoute)

// // Daashboard routes
router.use('/dashboard', dashboardUserRoute)

// API routes
router.use('/api', apiUserRoute)
router.use('/api', apiUserHistoryRoute)
router.use('/api', apiProfileRoute)

module.exports = router
