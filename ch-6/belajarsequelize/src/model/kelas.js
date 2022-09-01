const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kelas', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "NULL"
    },
    id_sekolah: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'sekolah',
        key: 'id'
      }
    },
    id_walikelas: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'guru',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'kelas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "kelas_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
