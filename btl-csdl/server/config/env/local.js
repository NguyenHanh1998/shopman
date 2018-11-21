module.exports = {
    port: 3000,
    mysql:  {
        username: 'shopman',
        password: 'shopman123',
        database: 'btl',
        host:'127.0.0.1',
        dialect: 'mysql',
        dialectOptions: {charset: 'utf8mb4', decimalNumbers: true},
        define: { charset: 'utf8mb4', collate: 'utf8mb4_general_ci'},
        pool: {
            min: 0,
            max: 10,
            acquire: 15000
        }
    }
}