const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
    host: process.env.PGHOST,
    dialect: process.env.DBDRIVER,
    port: process.env.PGPORT,
    logging: true
});
db
    .authenticate()
    .then(() => {
        console.info('INFO - Database connected.')
    })
    .catch(err => {
        console.error('ERROR - Unable to connect to the database:', err)
    })

module.exports = db