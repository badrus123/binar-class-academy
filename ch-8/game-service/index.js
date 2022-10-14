const express = require('express')
const app = express()
require('express-ws')(app)
const db = require('./src/model')
const wsRouter = require('./src/router/ws')
const router = require('./src/router/index')
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// error handler
db.sequelize
  .sync()
  .then(() => {
    console.log('Synced db.')
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message)
  })
app.use(router)
app.use('/game-socket', wsRouter)
app.listen(3001)
