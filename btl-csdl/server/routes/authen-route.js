module.exports = (app) => {
    app.get('/login',
        (req, res, next) => {
            return res.render('login', {
                title: 'Login | Admin'
            })
        })
}