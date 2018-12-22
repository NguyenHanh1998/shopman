module.exports = function (sequelize, DataTypes) {
  return sequelize.define('sale_receipt', {
    receipt_id: {
      type: DataTypes.STRING(10),
      unique: true,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    paid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    paid_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    customer_id: {
      type: DataTypes.STRING(10),
      references: {
        model: "customer_infor",
        key: "customer_id"
      }
    }
  }, {
      underscored: true,
      timestamps: false,
    })
}