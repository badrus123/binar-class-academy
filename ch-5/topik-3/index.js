const express = require('express')
const app = express()
const path = require('path')
const session = require('express-session')
const port = process.env.PORT || 3000
const logger = require('./middleware/built-middleware')
const router = require('./router/index.js')
const routerAuth = require('./router/auth.js')
const { MemoryStore } = require('express-session')
const sessionStorage = new MemoryStore()
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
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(logger)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)
app.use(routerAuth)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
