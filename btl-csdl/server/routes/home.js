module.exports = (app) => {
    app.get('/',
    (req, res, next) => {
        return res.redirect('/products')
    })
}