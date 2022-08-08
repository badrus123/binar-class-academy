const fs = require('fs')
const ObjectId = require('bson-objectid')
class AuthController {
  register(req, res) {
    const { email, password } = req.body
    const user = JSON.parse(fs.readFileSync('user.json'))
    const isAuth = user.find((item) => item.email === email)

    if (isAuth) {
      res.redirect('/register')
    } else {
      user.push({ id: ObjectId(), email, password })
      const data = JSON.stringify(user)
      fs.writeFileSync('user.json', data)
      res.redirect('/login')
    }
  }
  login(req, res) {
    const { email, password } = req.body
    const data = JSON.parse(fs.readFileSync('user.json'))
    const user = data.find(
      (item) => item.email === email && item.password === password,
    )
    if (user) {
      req.session.user = user
      res.redirect('/')
    } else {
      res.redirect('/login')
    }
  }
}

module.exports = AuthController
