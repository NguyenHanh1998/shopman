const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./server/config/index')

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, './client/views/pages'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

//DataContext
const mysql_data_context = require('./server/repositories/mysql-context')(config.mysql)

//Repositories
const AdminRespository = require('./server/repositories/admin-repositories')

const admin_respository = new AdminRespository(mysql_data_context)

//Service
const AuthenService = require('./server/service/authen-service')
const ProductService = require('./server/service/product-service')
const OrderService = require('./server/service/order-service')

const authen_service = new AuthenService(admin_respository)

//Controller
const AuthenController = require('./server/controller/authen-controller')
const ProductController = require('./server/controller/product-controller')
const OrderController = require('./server/controller/order-controller')

const authen_controller = new AuthenController(authen_service)


//Routes
require('./server/routes/home')(app)
require('./server/routes/authen-route')(app, authen_controller)
require('./server/routes/products-route')(app)
require('./server/routes/order-route')(app)
require('./server/routes/main-route')(app)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
