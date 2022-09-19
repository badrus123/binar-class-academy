const express = require('express')
const router = express.Router()

const apiUserController = require('./../../controllers/api/user.controller')
// API
router
  .route('/users')
  .get(apiUserController.index)
  .post(apiUserController.store)
  .put(apiUserController.update)
  .delete(apiUserController.delete)

module.exports = router
