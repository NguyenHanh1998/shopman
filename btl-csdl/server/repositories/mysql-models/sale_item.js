module.exports = function (sequelize, DataTypes) {
    return sequelize.define('sale_item', {
        sale_id: {
            type: DataTypes.STRING(10),
            unique: true,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        receipt_id: {
            type: DataTypes.STRING(10),
            references: {

            }
        },
        product_id: {
            type: DataTypes.STRING(10),
            references: {

            }
        },
        quantity_sold: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
            underscored: true,
            timestamps: false,
        })
}