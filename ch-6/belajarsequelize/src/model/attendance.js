const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('attendance', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    time_attendance: {
      type: DataTypes.DATE,
      allowNull: true
    },
    id_siswa: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'siswa',
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
    tableName: 'attendance',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "attendance_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
