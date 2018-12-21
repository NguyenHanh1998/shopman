class OrderService {
  constructor(order_repository) {
    this.order_repository = order_repository
    this.retrieve_all = this.retrieve_all.bind(this)
    this.get_customer_info = this.get_customer_info.bind(this)
    this.get_sale_items = this.get_sale_items.bind(this)
  }

  retrieve_all(condition, select, offset, limit, callback) {
    this.order_repository.find_all(condition, select, offset, limit, (err, orders) => {
      if (err) return callback(err)
      return callback(null, orders)
    })
  }

  get_customer_info(condition, select, callback) {
    this.order_repository.find_customer(condition, select, (err, order_customer) => {
      if (err) return callback(err)
      return callback(null, order_customer)
    })
  }

  get_sale_items(condition, select, callback) {
    this.order_repository.find_items(condition, select, (err, sale_items) => {
      if (err) return callback(err)
      return callback(null, sale_items)
    })
  }

  get_sale_product(condition, select, callback) {
    this.order_repository.find_product(condition, select, (err, product) => {
      if (err) return callback(err)
      return callback(null, product)
    })
  }

  get_sale_date(receipt_id, select, callback) {
    this.order_repository.find_date(receipt_id, select, (err, sale_date) => {
      if (err) return callback(err)
      return callback(null, sale_date)
    })
  }
}
module.exports = OrderService