const Sequelize = require('sequelize')

const db = require('./../configs/db.config')

db.database = require('./init-models')(db, Sequelize)

module.exports = db