const express = require('express')
const router = express.Router()

const dashboardUserController = require('../../controllers/dashboard/user.controller')
const dashboardUserHistoryController = require('../../controllers/dashboard/userHistory.controller')
const dashboardUserBiodataController = require('../../controllers/dashboard/userBiodata.controller')

const restrict = require('./../../middlewares/restrict')

router.use(restrict)

// Main Dashboard
router.get('/', (req, res) => res.redirect('/dashboard/user'))

// User
router
  .route('/user')
  .get(dashboardUserController.index)
  .post(dashboardUserController.store)
  .put(dashboardUserController.update)
  .delete(dashboardUserController.delete)

router.get('/user/create', dashboardUserController.create)
router.get('/user/edit/:id', dashboardUserController.edit)

// History
router.get('/user-history/:id', dashboardUserHistoryController.index)

// Biodata
router.get('/user-biodata/:id', dashboardUserBiodataController.edit)
router.put('/user-biodata', dashboardUserBiodataController.update)

// Popup Modal
router.get(
  '/get-user-biodata/:id',
  dashboardUserBiodataController.getUserBiodata,
)

module.exports = router
