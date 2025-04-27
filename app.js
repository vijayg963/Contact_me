var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var dotenv = require('dotenv'); // Import dotenv to load environment variables
require('dotenv').config(); // Load environment variables from .env file

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const password = process.env.MONGO_PASSWORD; // Use environment variable for password
const username = process.env.MONGO_USERNAME; // Use environment variable for username
const url = `mongodb+srv://${username}:${password}@cluster0.i2hab2t.mongodb.net/contact_us?retryWrites=true&w=majority`;
// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/contact_us')
mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); 

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

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
