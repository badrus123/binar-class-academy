module.exports = {
  isGuest: (req, res, next) => {
    const verify = req?.session?.user
    if (!verify) next()
    else res.redirect('/')
  },
  isAdmin: (req, res, next) => {
    const verify = req?.session?.user
    if (verify) next()
    else res.redirect('/login')
  },
}
