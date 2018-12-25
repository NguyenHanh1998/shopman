const async = require('async')
class MainController {
  constructor(order_service) {
    this.order_service = order_service
    this.month_best_sold = this.month_best_sold.bind(this)
    this.get_sum_category = this.get_sum_category.bind(this)
  }

  month_best_sold(req, res, next) {
    res.month_sold = []
    let best_sold = {}
    let worst_sold = {}
    let sum_total = 0

    for (let i = 0; i < 11; i++) {
      let month = i + 1
      res.month_sold.push(Object.assign({}, { month }))
    }


    async.waterfall([
      cb => {
        async.eachSeries(res.month_sold, (item, m_cb) => {
          let f_month = item.month
          this.order_service.month_best_sold(f_month, (err, res_month) => {
            if (err) return m_cb(err)
            Object.assign(item, res_month)
            m_cb()
          })
        }, err => cb(err, res.month_sold))
      },
      (month_sold, cb) => {
        let max = Math.max.apply(Math, month_sold.map(function (o) { return o.sum_total }))
        let min = Math.min.apply(Math, month_sold.map(function (o) { return o.sum_total }))
        month_sold.forEach(element => {
          if (element.sum_total == max) {
            Object.assign(best_sold, element)
          }
          else if (element.sum_total == min) {
            Object.assign(worst_sold, element)
          }
          sum_total = sum_total + element.sum_total
        })
        let sum_total_cate = Object.assign({}, { sum_total })
        return cb(null, month_sold, best_sold, worst_sold, sum_total_cate)
      }
    ], (err, month_sold, best_sold, worst_sold, sum_total_cate) => {
      if (err) next(err)
      else {
        res.month_sold = month_sold
        res.best_sold = best_sold
        res.worst_sold = worst_sold
        res.sum_total_cate = sum_total_cate
        next()
      }
    })
  }

  get_sum_category(req, res, next) {
    let category_tmp = ["fresh food", "Alcohol & Tobacco", "Health & Beauty", "Stationery", "Household goods"]
    res.category = []
    for (let i = 0; i < category_tmp.length; i++) {
      let x = category_tmp[i]
      res.category.push(Object.assign({}, { x }))
    }
    async.eachSeries(res.category, (item, cb) => {
      let name_cate = item.x
      this.order_service.find_category(name_cate, (err, cate_sum) => {
        if (err) return cb(err)
        Object.assign(item, cate_sum)
        cb()
      })
    }, err => {
      return next(err)
    })
  }
}

module.exports = MainController