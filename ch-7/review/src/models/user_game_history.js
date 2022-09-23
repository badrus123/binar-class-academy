const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('user_game_history', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_game_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'user_game',
        key: 'id'
      }
    },
    user_choice: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    com_choice: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    result: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    playing_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_game_history',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_game_history_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
