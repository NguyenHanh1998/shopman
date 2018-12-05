class ProductController {
  constructor(product_service) {
    this.product_service = product_service
    this.retrieve_all = this.retrieve_all.bind(this)
    this.check_if_has_more = this.check_if_has_more.bind(this)
    this.search = this.search.bind(this)
  }
  retrieve_all(req, res, next) {
    let { offset = 0, limit = 20 } = req.query
    let condition = {}
    // Object.keys(req.where).length ? req.where :
    let select = ['product_id', 'name', 'category', 'price_per_unit', 'instock']
    this.product_service.retrieve_all(condition, select, offset, limit, (err, products) => {
      if (err) next(err)
      else {
        res.products = products,
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
    let select = ['product_id', 'name', 'category', 'price_per_unit', 'instock']
    this.product_service.retrieve_all(condition, select, +offset + 1, limit, (err, products) => {
      if (err) res.has_more = false
      else res.has_more = products.length != 0
      return next()
    })
  }

  search(req, res, next) {
    let { offset = 0, limit = 20, q_title =''} = req.query
    let condition = Object.assign({}, { q_title})
    let select = ['product_id', 'name', 'category', 'price_per_unit', 'instock']
    this.product_service.search(condition, select, offset, limit, (err, products) => {
      if(err) return next(err)
      else {
        
      }
    })
  }
}
module.exports = ProductController