module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'category',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal("timezone('utc'::text, now())"),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'category',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'category_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  )
}
