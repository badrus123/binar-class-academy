const express = require('express')
const router = express.Router()

const authController = require('./../controllers/auth.controller')
const userController = require('./../controllers/user.controller')

const authMiddleware = require('./../middlewares/auth.middleware')
const restrict = require('./../middlewares/restrict')

// Authentication
router.get('/login', authMiddleware.isGuest, userController.login)

router.post('/auth', authMiddleware.isGuest, authController.auth)

router.post('/logout', restrict, authController.logout)

// Registrasi
router
  .route('/sign-up')
  .get(authMiddleware.isGuest, userController.signup)
  .post(authMiddleware.isGuest, userController.register)

// User Setup
router
  .route('/setting')
  .put(restrict, userController.updateUser)
  .get(restrict, userController.setting)

router.post('/delete-account', restrict, userController.deleteUser)

module.exports = router
