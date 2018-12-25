class ProductController {
  constructor(product_service) {
    this.product_service = product_service
    this.retrieve_all = this.retrieve_all.bind(this)
    this.check_if_has_more = this.check_if_has_more.bind(this)
    this.search = this.search.bind(this)
    this.retrieve_one = this.retrieve_one.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
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
    let { offset = 0, limit = 20, name = '' } = req.query
    let condition = Object.assign({}, { name })
    let select = ['product_id', 'name', 'category', 'price_per_unit', 'instock']
    this.product_service.search(condition, select, offset, limit, (err, products) => {
      if (err) return next(err)
      else {
        res.products = products
        res.offset = offset
        return next()
      }
    })
  }


  retrieve_one(req, res, next) {
    let product_id = req.params
    // let condition = Object.assign({}, { product_id })
    let select = ['product_id', 'name', 'category', 'price_per_unit', 'instock']
    this.product_service.retrieve_one(product_id, select, (err, product) => {
      if (err) next(err)
      else {
        res.product = product
        return next()
      }
    })
  }

  update(req, res, next) {
    let { product_id } = req.params
    let product = req.body
    let condition = Object.assign({}, { product_id })
    this.product_service.update(condition, product, (err, updated) => {
      if (err) next(err)
      else {
        res.updated = updated
        return next()
      }
    })
  }

  delete(req, res, next) {
    let product_id = req.body.product_id
    let condition = Object.assign({}, { product_id })
    this.product_service.delete(condition, (err, body) => {
      if (err) next(err)
      res.body = body
      return next()
    })
  }
}
module.exports = ProductController