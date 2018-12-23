const async = require('async')

class OrderController {
  constructor(order_service) {
    this.order_service = order_service
    this.retrieve_all = this.retrieve_all.bind(this)
    this.check_if_has_more = this.check_if_has_more.bind(this)
    this.get_customer_info = this.get_customer_info.bind(this)
    this.get_sale_items = this.get_sale_items.bind(this)
    this.get_sale_product = this.get_sale_product.bind(this)
    this.get_quantity = this.get_quantity.bind(this)
    this.get_date = this.get_date.bind(this)
    this.search = this.search.bind(this)
  }

  retrieve_all(req, res, next) {
    let { offset = 0, limit = 20 } = req.query
    let condition = {}
    let select = ['receipt_id', 'paid', 'paid_time', 'customer_id']
    this.order_service.retrieve_all(condition, select, offset, limit, (err, orders) => {
      if (err) next(err)
      else {
        res.orders = orders,
          res.offset = offset
        return next()
      }
    })
  }

  check_if_has_more(req, res, next) {
    let { load_prev } = req.query
    if (load_prev !== undefined) return next()
    let { offset = 0, limit = 20 } = req.query
    let { condition } = {}
    let select = ['receipt_id', 'paid', 'paid_time', 'customer_id']
    this.order_service.retrieve_all(condition, select, +offset + 1, limit, (err, orders) => {
      if (err) res.has_more = false
      else res.has_more = orders.length != 0
      return next()
    })
  }

  get_sale_items(req, res, next) {
    let receipt_id = req.params.receipt_id
    let condition = Object.assign({}, { receipt_id })
    let select = ['product_id', 'quantity_sold', 'price']
    this.order_service.get_sale_items(condition, select, (err, order_items) => {
      if (err) next(err)
      else {
        res.order_items = order_items
        return next()
      }
    })
  }

  get_customer_info(req, res, next) {
    let customer_id = req.query.customer_id
    let condition = Object.assign({}, { customer_id })
    let select = ['customer_id', 'customer_name', 'email']
    this.order_service.get_customer_info(condition, select, (err, order_customer) => {
      if (err) next(err)
      else {
        res.order_customer = order_customer
        return next()
      }
    })
  }

  get_sale_product(req, res, next) {
    if (!res.order_items) return next()
    res.sale_products = []

    async.eachSeries(res.order_items, (item, cb) => {
      let product_id = item.product_id
      let condition = Object.assign({}, { product_id })
      let select = ['product_id', 'name', 'category', 'price_per_unit']
      this.order_service.get_sale_product(condition, select, (err, res_item) => {
        if (err) return cb(err)

        Object.assign(item, res_item)
        cb()
      })
    }, err => {
      return next(err)
    })
  }

  get_quantity(req, res, next) {
    let product_id = req.query.product_id
    let condition = Object.assign({}, { product_id })
    let select = ['receipt_id', 'quantity_sold']
    this.order_service.get_sale_items(condition, select, (err, order_quantity) => {
      if (err) next(err)
      else {
        res.order_quantity = order_quantity
        return next()
      }
    })
  }

  get_date(req, res, next) {
    if (!res.order_quantity) return next()
    res.order_sale = []
    let d = new Date()
    let c_year = d.getFullYear()
    let c_month = d.getMonth()
    async.eachSeries(res.order_quantity, (item, cb) => {
      let receipt_id = item.receipt_id
      let select = ['paid_time']
      this.order_service.get_sale_date(receipt_id, select, (err, sale_date) => {
        if (err) return cb(err)
        if (sale_date != null) {
          Object.assign(item, sale_date)
          res.order_sale.push(item)
        }
        cb()
      })
    }, err => {
      return next(err)
    })
  }

  search(req, res, next) {
    let { offset = 0, limit = 20, receipt_id = '' } = req.query
    let condition = Object.assign({}, { receipt_id })
    let select = ['receipt_id', 'paid', 'paid_time', 'customer_id']
    this.order_service.search(condition, select, offset, limit, (err, orders) => {
      if (err) return next(err)
      else {
        res.orders = orders
        res.offset = offset
        return next()
      }
    })
  }
}


module.exports = OrderController
