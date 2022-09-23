const userSocket = require('../utils/usersSocket')
class Game {
  gameView(req, res) {
    const { roomId } = req.params
    const userArr = userSocket.users
    const lawan = userArr.find(
      (user) => user.id !== req?.session?.user?.username,
    )
    if (userArr.length > 1) {
      res.redirect(`/`)
    } else {
      res.render('game', {
        username: req?.session?.user?.username
          ? req?.session?.user?.username
          : '',
        lawan: lawan?.username === undefined ? 'waiting' : lawan?.username,
        room: roomId,
      })
    }
  }
}
module.exports = new Game()
