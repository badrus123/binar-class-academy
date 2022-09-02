module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'role',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'role',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'role_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  )
}
