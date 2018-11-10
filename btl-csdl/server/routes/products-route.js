module.exports = (app) => {
    app.get('/products', 
    (req, res, next) => {
        return res.render('product/list-products', {
            title: 'Products | Admin'
        })
    })
}