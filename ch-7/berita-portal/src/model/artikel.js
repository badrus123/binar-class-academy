module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'artikel',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      slug: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      artikel: {
        type: DataTypes.TEXT,
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
      tableName: 'artikel',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'artikel_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  )
}
