const express = require('express')
const app = express()
const router = require('./src/router/index')
const db = require('./src/model/index')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)
db.sequelize
  .sync()
  .then(() => {
    console.log('Synced db.')
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message)
  })
app.listen(3000, () => {
  console.log('server ready')
})
