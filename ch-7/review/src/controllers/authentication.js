const fs = require('fs')
const model = require('./../models/index')
const bcrypt = require('bcrypt')
const userGame = model.database.user_game
class Authentication {
  login(req, res) {
    res.render('login')
  }
  register(req, res) {
    res.render('register')
  }
  async registerPost(req, res) {
    try {
      const { username, password } = req.body
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)
      await userGame.create({
        username: username,
        password: hash,
        role: 'player',
      })
      res.redirect('/login')
    } catch (error) {
      console.log(error)
      res.redirect('/register')
    }
  }
  async loginPost(req, res) {
    const { username, password } = req.body
    const user = await userGame.findOne({
      where: {
        username: username,
      },
    })
    if (user) {
      const checkPassword = bcrypt.compareSync(password, user.password)
      if (checkPassword) {
        req.session.user = user
        res.redirect('/')
      } else {
        res.redirect('/login')
      }
    } else {
      res.redirect('/login')
    }
  }
  logoutPost(req, res) {
    req.session.destroy()
    res.redirect('/')
  }
}

module.exports = new Authentication()
