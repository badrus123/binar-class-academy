//Import the mongoose module
const mongoose = require('mongoose')

//Set up default mongoose connection
const mongoDB =
  'mongodb+srv://binar:Fe7pVtZ4QoPv6Esz@binar.rybjgfa.mongodb.net/binar_chat'
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })

//Get the default connection
const db = mongoose.connection

module.exports = db
