const express = require('express')
const app = express()
const path = require('path')
const session = require('express-session')
const { MemoryStore } = require('express-session')
const sessionStorage = new MemoryStore()
const db = require('./src/model/config')
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const chat = require('./src/model/chat')
//file imports
const router = require('./src/router/index')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
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

io.on('connection', (socket) => {
  socket.on('chat message', async (msg) => {
    if (msg.length > 0) {
      chat.create({ message: msg })
      io.emit('chat message', [{ message: msg }])
    } else {
      const newMsg = await chat.find()
      io.emit('chat message', newMsg)
    }
  })
})
server.listen(3000, () => {
  console.log('Server listening on port ' + 3000 + '!')
})
