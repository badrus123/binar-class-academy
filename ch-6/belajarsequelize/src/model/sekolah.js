module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'sekolah',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: 'NULL',
      },
      alamat: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: 'NULL',
      },
    },
    {
      sequelize,
      tableName: 'sekolah',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'sekolah_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  )
}
