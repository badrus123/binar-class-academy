module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'score',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
      },
      score: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'score',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'score_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  )
}
