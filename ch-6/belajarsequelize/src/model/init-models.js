const DataTypes = require('sequelize').DataTypes
const _user = require('./user')
const _role = require('./role')
const _sekolah = require('./sekolah')
const _attendance = require('./attendance')

function initModels(sequelize) {
  const user = _user(sequelize, DataTypes)
  const sekolah = _sekolah(sequelize, DataTypes)
  const role = _role(sequelize, DataTypes)
  const attendance = _attendance(sequelize, DataTypes)

  user.belongsTo(sekolah, { as: 'sekolah', foreignKey: 'id_sekolah' })
  sekolah.hasMany(user, { as: 'sekolah', foreignKey: 'id_sekolah' })
  user.belongsTo(role, { as: 'role', foreignKey: 'id_role' })
  role.hasMany(user, { as: 'role', foreignKey: 'id_role' })
  attendance.belongsTo(user, { as: 'user', foreignKey: 'id_user' })
  user.hasMany(attendance, { as: 'user', foreignKey: 'id_user' })

  return {
    sekolah,
    role,
    user,
    attendance,
  }
}
module.exports = initModels
module.exports.initModels = initModels
module.exports.default = initModels
