const express = require('express')
const app = express()
const path = require('path')
const session = require('express-session')
const { MemoryStore } = require('express-session')
const sessionStorage = new MemoryStore()

//file imports
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
app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
