const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const axios = require('axios')
const io = new Server(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    // const dataBody = {
    //   content: `${msg}`,
    // }

    // axios.post(
    //   'https://discord.com/api/webhooks/1001240008813985844/yy2BFoFofGxB8Xbi0TrLUE1HQr4ajdCEitKrPWCElkAmFZMGpuQdRKPOdLi63sxD7AYL',
    //   dataBody,
    // )
    io.emit('chat message', msg)
  })
})
server.listen(3000, () => {
  console.log('listening on *:3000')
})
