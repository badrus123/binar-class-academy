const user = require('../model/user')
const becrypt = require('bcrypt')
class Authentication {
  login(req, res) {
    res.render('login')
  }
  register(req, res) {
    res.render('register')
  }
  async registerPost(req, res) {
    try {
      const { email, password } = req.body
      const salt = await becrypt.genSalt(10)
      const hashPassword = await becrypt.hash(password, salt)
      await user.create({ email: email, password: hashPassword })
      res.redirect('/login')
    } catch (error) {
      res.redirect('/register')
    }
  }
  async loginPost(req, res) {
    try {
      const { email, password } = req.body
      const userAcc = await user.findOne({ email: email })
      const validPassword = becrypt.compare(password, userAcc.password)
      if (validPassword) {
        req.session.user = userAcc
        res.redirect('/')
      } else {
        res.redirect('/login')
      }
    } catch (error) {
      res.redirect('/login')
    }
  }
  logoutPost(req, res) {
    req.session.destroy()
    res.redirect('/')
  }
}

module.exports = new Authentication()
