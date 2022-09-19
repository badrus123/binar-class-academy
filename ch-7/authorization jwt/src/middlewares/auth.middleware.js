const { getUserVerified } = require('./../utils/jtwToken.utils')

const { responseError } = require('./../utils/responseFormatter.utils')

module.exports = {
  isGuest: (req, res, next) => {
    const token = req.header.authorization
    const verify = getUserVerified(token)

    if (!verify) next()
    else res.redirect('/')
  },
  isAdmin: (req, res, next) => {
    const admin = req.user.role

    if (admin === 'admin') next()
    else res.status(403).json(responseError('Forbidden'))
  },
}
