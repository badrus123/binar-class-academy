const express = require('express')
const app = express()
const router = require('./src/router/index.router')
const db = require('./src/model/index')
const expressSwagger = require('express-swagger-generator')(app)
let options = {
  swaggerDefinition: {
    info: {
      description: 'This is a sample server',
      title: 'Swagger',
      version: '1.0.0',
    },
    host: 'localhost:3000',
    basePath: '/',
    produces: ['application/json', 'application/xml'],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: '',
      },
    },
  },
  basedir: __dirname, //app absolute path
  files: ['./src/router/**/*.router.js'], //Path to the API handle folder
}
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
expressSwagger(options)
app.use(router)
db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Synced db.')
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message)
  })
app.listen(3000, () => {
  console.log('server ready')
})
