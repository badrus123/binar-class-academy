module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'user',
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
      email: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      saldo: {
        type: DataTypes.INTEGER,
        defaultValue: 100000,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal("timezone('utc'::text, now())"),
      },
    },
    {
      sequelize,
      tableName: 'user',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'user_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  )
}
