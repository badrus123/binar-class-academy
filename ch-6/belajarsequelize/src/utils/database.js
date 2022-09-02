module.exports = {
  HOST: 'localhost',
  USER: 'postgres',
  PASSWORD: 'badrus123',
  PORT: 5433,
  DB: 'sequelize',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}
