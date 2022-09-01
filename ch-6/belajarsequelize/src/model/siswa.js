module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'siswa',
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
      id_sekolah: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'sekolah',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'siswa',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'siswa_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  )
}
