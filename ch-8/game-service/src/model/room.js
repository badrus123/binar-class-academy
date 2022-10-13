module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'room',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
      },
      nama: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'room',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'room_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  )
}
