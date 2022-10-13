class Game {
  joinGame(ws, req) {
    const { id } = req.params
    ws.on('message', function (msg) {
      console.log('Socket Connected', id)
      console.log(msg)
    })
  }
}
module.exports = new Game()
