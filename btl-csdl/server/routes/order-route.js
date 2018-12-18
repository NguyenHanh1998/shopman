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
}