class Home {
  index(req, res) {
    res.render('index', {
      username: req?.session?.user?.username
        ? req?.session?.user?.username
        : '',
    })
  }
}
module.exports = new Home()
