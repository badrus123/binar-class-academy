const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('score', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    score: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    semester: {
      type: DataTypes.BIGINT,
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
    id_subject: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'subject',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'score',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "score_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
