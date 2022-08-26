class Game {
  gameView(req, res) {
    res.render('game')
  }
}
module.exports = new Game()
