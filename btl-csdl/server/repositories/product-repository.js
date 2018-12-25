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

  update(condition, product, callback) {
    this.Product.update((product), {
      where: condition
    }).then(res => {
      callback(null, res.every(val => val == 1))
      return null
    }).catch(err => {
      let error = err.message
      callback(error)
      return null
    })
  }

  delete(condition, callback) {
    this.Product.destroy({
      where: condition
    }).then(res => {
      callback(null, res > 0)
      return null
    }).catch(err => {
      let error = err.message
      callback(error)
      return null
    })
  }

  create(product, callback) {
    this.Product.create((product))
      .then(res => {
        callback(null, res)
        return null
      }).catch(err => {
        let error = err.message
        callback(error)
        return null
      })
  }
}
