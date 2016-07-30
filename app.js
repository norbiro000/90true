var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var MongoDBStore = require('connect-mongodb-session')(session);
var passport = require('passport');
require('./config/passport')(passport); // pass passport for configuration

var routes = require('./routes/index');
var invite = require('./routes/invite');
var users = require('./routes/users');
var login = require('./routes/login');
var auth = require('./routes/auth');
var api = require('./routes/api');

var app = express();

var config = require('./config/database')(app);
var store = new MongoDBStore(
      { 
        uri: config.database.connection.hostname,
        collection: 'sessions'
      });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Load Config data and set to app
app.set('port', config.server.port);

// database Setup
// app.set(mongoose.connect(databaseConfig.url)); // connect to our database

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Passport


// connect to our database
mongoose.connect(config.database.connection.hostname);

//Store Session to database
// Express MongoDB session storage

app.use(session({
  secret: '93b50f1be00046b6bff43829e7455b97928759ef98706cd0172b79edb105faee',
  resave: true,
  proxy: true,
  secure: true,
  saveUninitialized: true,
  store: store,
  cookie: { 
    maxAge: 1000 * 60 * 24,
    // domain: 'http://localhost:5555'
  }
}))



app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/invite' , invite);
app.use('/login' , login);
app.use('/users', users);
app.use('/auth' , auth);
app.use('/api' , api);

// app.use('/api', api);


// databaseConfig(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
