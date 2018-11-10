module.exports = (app) => {
    app.get('/main', 
    (req, res, next) => {
        return res.render('main', {
            title: 'Main | Admin'
        })
    })
}