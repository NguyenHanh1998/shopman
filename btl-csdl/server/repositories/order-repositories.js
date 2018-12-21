// const underscore = require('underscore')
const Op = require('sequelize').Op

module.exports = class {
  constructor(db_context) {
    this.db_context = db_context
    this.Order = db_context.Order
    this.Customer = db_context.Customer
    this.Items = db_context.Items
    this.Product = db_context.Product
  }

  find_all(condition, select, offset, limit, callback) {
    condition = condition || {}

    this.Order.findAll({
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

  find_customer(condition, select, callback) {
    condition = condition || {}

    this.Customer.findOne({
      where: condition,
      attributes: select
    }).then(res => {
      if (!res) callback(null, [])
      else {
        res = res.dataValues
        callback(null, res)
        return null
      }
    })
      .catch(err => {
        let error = err.message
        callback(error)
        return null
      })
  }

  find_items(condition, select, callback) {
    condition = condition || {}

    this.Items.findAll({
      where: condition,
      attributes: select
    }).then(res => {
      for (let i = 0; i < res.length; i++) {
        res[i] = res[i].dataValues
      }
      callback(null, res)
      return null
    })
      .catch(err => {
        let error = err.message

        callback(error)
        return null
      })
  }

  find_product(condition, select, callback) {
    condition = condition || {}

    this.Product.findOne({
      where: condition,
      attributes: select,
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

  find_date(receipt_id, select, callback) {
    // condition = condition || {}
    this.Order.findOne({
      where: {
        receipt_id,
        paid_time: {
          [Op.between]: ["2018-10-01", "2018-10-31"]
        }
      },
      attributes: select,
    }).then(res => {
      if (!res) callback(null, null)
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