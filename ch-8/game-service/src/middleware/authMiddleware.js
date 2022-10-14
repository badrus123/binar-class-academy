const passport = require('../utils/passport')
module.exports = passport.authenticate('jwt', {
  session: false,
})
