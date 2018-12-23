module.exports = (app, order_controller) => {
  app.get('/orders',
    order_controller.retrieve_all,
    order_controller.check_if_has_more,
    (req, res, next) => {
      let { has_more, orders } = res
      return res.render('orders/list-orders', {
        title: 'Orders | Admin',
        orders: orders,
        has_more: has_more,
        current_offset: res.offset
      })
    })

  app.get('/orders/search',
    order_controller.search,
    (req, res, next) => {
      let { has_more, orders } = res
      return res.render('orders/list-orders', {
        title: 'Orders~Search | Admin',
        orders: orders,
        has_more: has_more,
        current_offset: res.offset
      })
    })

  app.get('/orders/:receipt_id',
    order_controller.get_customer_info,
    order_controller.get_sale_items,
    order_controller.get_sale_product,
    (req, res, next) => {
      let { order_customer, order_items } = res
      return res.render('orders/order', {
        title: 'Order | Admin',
        customer: order_customer,
        items: order_items
      })
    })

  app.get('/order/chart',
    order_controller.get_quantity,
    order_controller.get_date,
    (req, res, next) => {
      let { order_sale } = res
      return res.render('orders/product-chart', {
        title: 'Order/Product-Chart',
        order_sale: JSON.stringify(order_sale)
      })
    })




}