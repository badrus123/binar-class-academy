require('dotenv').config()

const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const session = require('express-session')

const indexRoute = require('./src/routes/index.route')

const secret = 'jakut-klonop-2022'

const reroute = require('./src/middlewares/reroute.middleware')
const cookieParser = require('cookie-parser')

const methodOverride = require('method-override')

const flash = require('connect-flash')
const passport = require('./src/utils/passport')

app.set('view engine', 'ejs')
app.use(expressLayouts)

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.set('views', './views')

app.use(cookieParser(process.env.JWT_SECRET || secret))

app.use(
  session({
    secret: process.env.JWT_SECRET || secret, // salt
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 10000,
    },
  }),
)

app.use(flash())
app.use(passport.initialize())
// Routee
app.use(indexRoute)

app.use(reroute.escape404)
// Running Server
app.listen(process.env.PORT || port, () => {
  console.log(
    `Server Running. Listening on port http://localhost:${process.env.PORT}`,
  )
})
