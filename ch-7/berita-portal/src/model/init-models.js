const DataTypes = require('sequelize').DataTypes
const _artikel = require('./artikel')
const _category = require('./category')

function initModels(sequelize) {
  const category = _category(sequelize, DataTypes)
  const artikel = _artikel(sequelize, DataTypes)

  artikel.belongsTo(category, { as: 'category', foreignKey: 'id_category' })
  category.hasMany(artikel, { as: 'category', foreignKey: 'id_category' })

  return {
    category,
    artikel,
  }
}
module.exports = initModels
module.exports.initModels = initModels
module.exports.default = initModels
