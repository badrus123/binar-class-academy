class Home {
  index(req, res) {
    res.render('index', {
      email: req?.session?.user?.email ? req?.session?.user?.email : '',
    })
  }
}
module.exports = new Home()
