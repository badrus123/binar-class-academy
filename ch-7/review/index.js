require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const session = require('express-session')
const { MemoryStore } = require('express-session')
const sessionStorage = new MemoryStore()
const { Server } = require('socket.io')
const http = require('http')
const userSocket = require('./src/utils/usersSocket')
// const WebSockets = require('./src/utils/WebSockets')
const router = require('./src/router/index')
app.use(
  session({
    secret: 'secret',
    resave: false,
    store: sessionStorage,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 10000,
    },
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(router)
/** Create HTTP server. */
const server = http.createServer(app)
/** Create socket connection */
const io = new Server(server)
// Run when client connects
io.on('connection', (socket) => {
  // console.log(io.of('/room').adapter)
  socket.on('joinRoom', ({ username, room }) => {
    const user = userSocket.userJoin(username, room)

    socket.join(user.room)

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: userSocket.getRoomUsers(user.room),
    })
  })
  // Listen for chatMessage
  socket.on('playerPicker', (msg) => {
    const user = userSocket.getCurrentUser(msg.username, msg.pick)
    io.to(user.room).emit('dataPick', user.users)
  })
  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userSocket.userLeave(socket.id)

    if (user) {
      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: userSocket.getRoomUsers(user.room),
      })
    }
  })
})
server.listen(3000)
