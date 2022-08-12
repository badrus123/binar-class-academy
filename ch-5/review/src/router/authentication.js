const express = require('express')
const router = express.Router()
const auth = require('../controllers/authentication')
const middlewareAuth = require('../middleware/middlewareAuth')

router.get('/login', middlewareAuth.isGuest, auth.login)
router.get('/register', middlewareAuth.isGuest, auth.register)
router.get('/logout', auth.logoutPost)
// router post
router.post('/register-akun', auth.registerPost)
router.post('/login-akun', auth.loginPost)
module.exports = router
