module.exports = class {
  constructor(db_context) {
    this.db_context = db_context
    this.Product = db_context.Product
  }

  find_all(condition, select, offset, limit, callback) {
    condition = condition || {}

    this.Product.findAll({
      attributes: select,
      where: condition,
      limit: limit,
      offset: (offset && limit ? offset * limit : 0)
    }).then(res => {
      for (let i = 0; i < res.length; i++) {
        res[i] = res[i].dataValues
      }
      callback(null, res)
      return null
    })
      .catch(err => {
        let error = err.message

        // logger.error('ProductRepository find_all()', error)
        callback(error)
        return null
      })
  }

  find_one(product_id, select, callback) {
    this.Product.findOne({
      where: product_id,
      attributes: select
    }).then(res => {
      if (!res) callback(null, [])
      else {
        res = res.dataValues
        callback(null, res)
        return null
      }
    }).catch(err => {
      let error = err.message
      callback(error)
      return null
    })
  }
}