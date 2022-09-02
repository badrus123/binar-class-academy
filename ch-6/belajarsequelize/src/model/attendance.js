module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'attendance',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
      },
      time_in: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      time_out: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'attendance',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'attendance_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  )
}
