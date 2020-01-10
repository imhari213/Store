var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var JWT = require('jsonwebtoken');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongoUtill  = require('./connection');
mongoUtill.connect();

var app = express();

//db connnection
// mongoUtill.connectToServer( function( err, client ) {
//   err ? console.log(err) : console.log("connection successfull");  
// });

// var db;
// mongoUtill.getDb((err,client)=>{
//   err ? console.log(err) :  db = client;
// })
// console.log(db,"----------");

// db.collection( 'users' ).find()
// .then((res)=>{
//    console.log(res);
// })


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
