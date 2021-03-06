var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
//기능 확장
// app.use((req,res,next)=>{
//   req.password = 'lsm'
//   express.json()(req,res,next)
// })
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use((req,res,next)=>{
  app.set('hello','zerocho')
  next()
})

app.use((req,res,next)=>{
   // set locals, only providing error in development
   res.locals.message = err.message;
   app.get('hello')
   //변수 미들웨어간 공유 가능
   res.locals.error = req.app.get('env') === 'development' ? err : {};
   next()
})

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.render('error',{message:err.message});
});

module.exports = app;
