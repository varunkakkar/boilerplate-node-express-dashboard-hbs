var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');

require('dotenv').config();

const chalk = require('chalk');
const log = console.log;

var dashboardRouter = require('./controllers/dashboard/index');

// MongoDB Connection

//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = process.env.DATABASE;
mongoose.connect(mongoDB, { 
  useNewUrlParser: true,
  useUnifiedTopology:true, 
  autoIndex: true, // Build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, chalk.bgRed.white('MongoDB connection error:')));

db.once('open', function() {
  // we're connected!
  log(chalk.bgGreenBright.black('MongoDB Connection Successful'));
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials', function (err) {});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', dashboardRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res,next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  log(chalk.yellow.bgBlack(err.statusCode))
  if(res.statusCode === 404){
    res.render('errors/error.hbs',{
      layout: "errors/layout.hbs",
      title: "XimiVogue - Page Not Found",
      message: "404 Page Not Found"
    })
  }
  // res.render('error');
});

module.exports = app;
