const fs = require('fs')
class Authentication {
  login(req, res) {
    res.render('login')
  }
  register(req, res) {
    res.render('register')
  }
  registerPost(req, res) {
    const { email, password } = req.body
    const user = JSON.parse(fs.readFileSync('user.json'))
    const isAuth = user.find((item) => item.email === email)

    if (isAuth) {
      res.redirect('/register')
    } else {
      const id = user.length + 1
      user.push({ id: id, email, password })
      const data = JSON.stringify(user)
      fs.writeFileSync('user.json', data)
      res.redirect('/login')
    }
  }
  loginPost(req, res) {
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
  logoutPost(req, res) {
    req.session.destroy()
    res.redirect('/')
  }
}

module.exports = new Authentication()
