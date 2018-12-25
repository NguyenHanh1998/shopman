class OrderService {
  constructor(order_repository) {
    this.order_repository = order_repository
    this.retrieve_all = this.retrieve_all.bind(this)
    this.get_customer_info = this.get_customer_info.bind(this)
    this.get_sale_items = this.get_sale_items.bind(this)
    this.search = this.search.bind(this)
    this.month_best_sold = this.month_best_sold.bind(this)
    this.find_category = this.find_category.bind(this)
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

  search(condition, select, offset, limit, callback) {
    this.order_repository.find_all(condition, select, offset, limit, (err, orders) => {
      if (err) return callback(err)
      return callback(null, orders)
    })
  }

  month_best_sold(f_month, callback) {
    this.order_repository.find_best_month(f_month, (err, res_month) => {
      if (err) return callback(err)
      return callback(null, res_month)
    })
  }

  find_category(name_cate, callback) {
    this.order_repository.find_category(name_cate, (err, sum_cate) => {
      if (err) return callback(err)
      return callback(null, sum_cate)
    })
  }
}
module.exports = OrderService
