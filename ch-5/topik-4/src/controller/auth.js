const becrypt = require('bcrypt')
const fs = require('fs')
const jwt = require('jsonwebtoken')
class Auth {
  async login(req, res) {
    try {
      const { username, password } = req.body
      const user = JSON.parse(fs.readFileSync('user.json'))
      const isAuth = user.find((item) => item.username === username)
      if (!isAuth) {
        return res.status(400).json({
          message: 'User not found',
        })
      } else {
        const isMatch = await becrypt.compare(password, isAuth.password)
        if (isMatch) {
          const token = jwt.sign(
            {
              id: isAuth.id,
              username: isAuth.username,
            },
            process.env.SECRET_KEY,
            { expiresIn: '1h' },
          )
          res.status(200).json({
            message: 'Login success',
            token,
          })
        } else {
          res.status(400).json({
            message: 'Password not match',
          })
        }
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }
  async register(req, res) {
    try {
      const user = JSON.parse(fs.readFileSync('user.json'))
      const { username, password } = req.body
      const isAuth = user.find((item) => item.username === username)
      if (isAuth) {
        res.status(400).json({
          message: 'username already exists',
        })
      } else {
        const salt = await becrypt.genSalt(10)
        const hash = await becrypt.hash(password, salt)
        user.push({
          id: user.length + 1,
          username,
          password: hash,
        })
        fs.writeFileSync('user.json', JSON.stringify(user))
        res.status(200).json({
          message: 'register success',
        })
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }
}

module.exports = new Auth()
