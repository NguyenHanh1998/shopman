module.exports = (app) => {
    app.get('/orders', 
    (req, res, next) => {
        return res.render('orders/list-orders', {
            title: 'Orders | Admin'
        })
    })
}