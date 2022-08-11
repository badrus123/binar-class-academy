class Hello {
  say(req, res) {
    res.status(200).json({
      message: 'Hello World',
    })
  }
  async sayHello(req, res) {
    try {
      res.status(200).json({
        message: 'Hello World',
        data: req.decoded,
      })
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }
}

module.exports = new Hello()
