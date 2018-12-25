module.exports = (app, product_controller) => {
  app.get('/products',
    product_controller.retrieve_all,
    product_controller.check_if_has_more,
    (req, res, next) => {
      let { has_more, products } = res
      return res.render('product/list-products', {
        title: 'Products | Admin',
        products: products,
        has_more: has_more,
        current_offset: res.offset
      })
    })

  app.get('/products/:product_id',
    product_controller.retrieve_one,
    (req, res, next) => {
      let { product } = res
      return res.render('product/product', {
        title: 'Product | Admin',
        product: product
      })
    })

  app.get('/products/search',
    product_controller.search,
    (req, res, next) => {
      let { has_more, products } = res
      return res.render('product/list-products', {
        title: 'Products | Admin',
        products: products,
        has_more: has_more,
        current_offset: res.offset
      })
    })

  app.put('/products/:product_id',
    product_controller.update,
    (req, res) => {
      return res.status(200).send({ updated: res.updated })
    })

  app.delete('/product',
    product_controller.delete,
    (req, res) => {
      return res.status(200).send({ body: res.body })
    }
  )

  app.post('/ajax/products',
    product_controller.create,
    (req, res) => {
      return res.status(200).send(res.product)
    })
}