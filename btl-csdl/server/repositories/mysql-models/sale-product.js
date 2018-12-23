module.exports = function (sequelize, DataTypes) {
    return sequelize.define('sale_product', {
        product_id: {
            type: DataTypes.STRING(10),
            unique: true,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
          type: DataTypes.STRING(35),
          allowNull: false
        },
        category: {
          type: DataTypes.STRING(35),
          allowNull: false
        },
        price_per_unit: {
          type: DataTypes.FLOAT,
          allowNull: false
        }
    }, {
      underscored: true,
      timestamps: false,
      freezeTableName: true,
    })
}