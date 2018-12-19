class ProductService {
  constructor(product_repository) {
    this.retrieve_all = this.retrieve_all.bind(this)
    this.product_repository = product_repository
    this.search = this.search.bind(this)
    this.retrieve_one = this.retrieve_one.bind(this)
  }

  retrieve_all(condition, select, offset, limit, callback) {
    // if (condition.product_ids !== undefined) {
    //   let product_ids = condition.product_ids
    //     .split(',')
    //     .filter(product_id => +product_id)
    //     .map(product_id => parseInt(product_id))
    //   product_ids = Array.from(new Set([...product_ids]))
    //   delete condition.product_ids
    //   Object.assign(condition, { product_id: { $in: product_ids } })
    //   offset = 0
    //   limit = null
    // }

    this.product_repository.find_all(condition, select, offset, limit, (err, products) => {
      if (err) return callback(err)
      return callback(null, products)
    })
  }


  retrieve_one(product_id, select, callback) {
    this.product_repository.find_one(product_id, select,(err, product) => {
      if (err) return callback(err)
      return callback(null, product)
    })
  }

  search(condition, select, offset, limit, callback) {
    // let query_name = condition.q_title
    // Object.assign(condition, { name: query_name })
    this.product_repository.find_all(condition, select, offset, limit, (err, products) => {
      if (err) return callback(err)
      return callback(null, products)
    })
  }

}
module.exports = ProductService