const Sequelize = require('sequelize')

const DataContext = function (config) {
    const sequelize = new Sequelize(config.database, config.username, config.password, config)

    const Product = sequelize.import('./mysql-models/product')

    return {
        Product,
        sequelize
    }
}

module.exports = DataContext