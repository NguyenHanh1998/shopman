module.exports = class {
	constructor(db_context) {
		this.db_context = db_context
		this.Admin = db_context.Admin

	}

	find_one(condition, callback) {
		this.Admin.findOne({ where: condition })
			.then(res => {
				res = res && res.dataValues
				callback(null, res)
				return null
			})
			.catch(err => {
				callback(err)
				return null
			})
	}
}