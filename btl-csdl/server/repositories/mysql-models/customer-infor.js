module.exports = function (sequelize, DataTypes) {
    return sequelize.define('customer_infor', {
        customer_id: {
            type: DataTypes.STRING(10),
            unique: true,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        customer_name: {
            type: DataTypes.STRING(35),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(35),
            allowNull: false
        }
    }, {
            underscored: true,
            timestamps: false,
            freezeTableName: true,
        })
}