const jwt = require('jsonwebtoken')
class AuthMiddleware {
  async validate(req, res, next) {
    try {
      const header = req.headers['authorization']

      if (!header) {
        return res.status(401).json({
          message: 'Unauthorized',
        })
      } else {
        const token = header.split(' ')[1]
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
          if (err) {
            return res.status(401).json({
              message: 'Unauthorized',
            })
          }
          req.decoded = decoded
          next()
        })
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }
}
module.exports = new AuthMiddleware()
