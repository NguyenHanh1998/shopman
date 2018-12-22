module.exports = (app) => {
    app.get('/orders', 
    (req, res, next) => {
        return res.render('orders/list-orders', {
            title: 'Orders | Admin'
        })
    })

    app.get('/orders/:order_id',
    (req, res, next) => {
        return res.render('orders/order', {
            title: 'Order | Admin'
        })
    })
}