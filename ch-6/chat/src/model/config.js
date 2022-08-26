//Import the mongoose module
const mongoose = require('mongoose')

//Set up default mongoose connection
const mongoDB = 'url_db'
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })

//Get the default connection
const db = mongoose.connection

module.exports = db
