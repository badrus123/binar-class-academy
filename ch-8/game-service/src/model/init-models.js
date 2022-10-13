const DataTypes = require('sequelize').DataTypes
const _user = require('./user')
const _room = require('./room')
const _joinRoom = require('./joinRoom')
const _score = require('./score')

function initModels(sequelize) {
  const room = _room(sequelize, DataTypes)
  const join_room = _joinRoom(sequelize, DataTypes)
  const user = _user(sequelize, DataTypes)
  const score = _score(sequelize, DataTypes)

  join_room.belongsTo(room, { as: 'room', foreignKey: 'id_room' })
  room.hasMany(join_room, { as: 'join_room', foreignKey: 'id_room' })
  score.belongsTo(room, { as: 'room', foreignKey: 'id_room' })
  room.hasMany(score, { as: 'score', foreignKey: 'id_room' })
  score.belongsTo(user, { as: 'user', foreignKey: 'id_user' })
  user.hasMany(score, { as: 'score', foreignKey: 'id_user' })
  return {
    room,
    user,
    score,
  }
}
module.exports = initModels
module.exports.initModels = initModels
module.exports.default = initModels
