module.exports = (app, main_controller) => {
  app.get('/main',
    main_controller.month_best_sold,
    main_controller.get_sum_category,
    (req, res, next) => {
      let { month_sold, best_sold, worst_sold, category, sum_total_cate } = res
      return res.render('main', {
        title: 'Main | Admin',
        month_sold: month_sold,
        best_month: best_sold,
        worst_month: worst_sold,
        sum_total_cate: sum_total_cate,
        category: JSON.stringify(category)
      })
    })
}