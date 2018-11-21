module.exports = function (sequelize, DataTypes) {
  return sequelize.define('admin', {
    admin_id: {
      type: DataTypes.STRING(10),
      unique: true,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    admin_name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    pass_word: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    mail: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
      underscored: true,
      timestamps: false,
      freezeTableName: true,
    })
}