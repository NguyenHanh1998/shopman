module.exports = (app, authen_controller) => {
	app.get('/login',
		(req, res, next) => {
			return res.render('login', {
				title: 'Login | Admin'
			})
		}
	)

	app.post('/login',
		authen_controller.login,
		(req, res) => {
			let { body } = res
			let { admin } = body
			return res.status(200).send(body)
		})
}