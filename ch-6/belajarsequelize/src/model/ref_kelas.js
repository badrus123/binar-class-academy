const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ref_kelas', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    id_kelas: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'kelas',
        key: 'id'
      }
    },
    id_guru: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'guru',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'ref_kelas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "ref_kelas_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
