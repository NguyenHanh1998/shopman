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
}