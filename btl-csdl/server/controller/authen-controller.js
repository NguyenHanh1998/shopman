class AuthenController {
	constructor(authen_service) {
		this.authen_service = authen_service
		this.login = this.login.bind(this)
    }

	login(req, res, next) {
		let { username, password } = req.body
		this.authen_service.login( username, password, (err, admin) => {
			if(err) res.body = { admin: null}
			else res.body = { admin }
			next()
		})
	}
}

module.exports = AuthenController