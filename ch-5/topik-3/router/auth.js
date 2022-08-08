const express = require('express')
const routerAuth = express.Router()
const AuthController = require('../src/controller/auth')
const routeMiddleware = require('../middleware/router-middleware')
const authController = new AuthController()
const middleware = new routeMiddleware()
// router
routerAuth.get('/login', middleware.isGuest, (req, res) => {
  res.render('login')
})
routerAuth.get('/register', middleware.isGuest, (req, res) => {
  res.render('register', { message: '' })
})
routerAuth.post('/register-akun', authController.register)
routerAuth.post('/login-akun', authController.login)
module.exports = routerAuth
