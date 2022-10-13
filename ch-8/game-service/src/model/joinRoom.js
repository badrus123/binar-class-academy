module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'join_room',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
      },
    },
    {
      sequelize,
      tableName: 'join_room',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'join_room_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  )
}
