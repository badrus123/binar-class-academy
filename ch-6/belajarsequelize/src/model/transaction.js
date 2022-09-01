const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transaction', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    total_price: {
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
    id_price: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'price',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'transaction',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "transaction_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
