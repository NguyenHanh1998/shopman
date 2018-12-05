const Sequelize = require('sequelize')

const DataContext = function (config) {
    const sequelize = new Sequelize(config.database, config.username, config.password, config)

    const Admin = sequelize.import('./mysql-models/admin')

    return {
        Admin,
        sequelize
    }
}

module.exports = DataContext