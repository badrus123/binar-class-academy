class Chat {
  chatView(req, res) {
    res.render('chat', {
      email: req?.session?.user?.email ? req?.session?.user?.email : '',
    })
  }
}
module.exports = new Chat()
