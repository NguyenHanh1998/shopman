const Sequelize = require('sequelize')

const DataContext = function (config) {
    const sequelize = new Sequelize(config.database, config.username, config.password, config)

    const Order = sequelize.import('./mysql-models/sale_receipt')
    const Customer = sequelize.import('./mysql-models/customer-infor')
    const Items = sequelize.import('./mysql-models/sale_item')
    const Product = sequelize.import('./mysql-models/sale-product')

    return {
        Order,
        Customer,
        Items,
        Product,
        sequelize
    }
}

module.exports = DataContext