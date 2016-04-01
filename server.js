require('dotenv').config();
var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,HEAD");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, x-auth, Content-Type, Accept");
    next();
});


app.options('*',function(req, res, next) {
    res.send('GET,POST,HEAD,DELETE');
});


// view engine setup
app.set('views', path.join(__dirname, 'layouts'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers/middleware/auth').decodeToken);


// CONTROLLER ROUTES
// ----------------- 
// route for index page
var indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// route for objects API
var prototypesRoutes = require('./routes/prototypes');
app.use('/objects/prototypes', prototypesRoutes);

// route for objects API
var objectsRoutes = require('./routes/objects');
app.use('/objects', objectsRoutes);

//route for users API
var usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);

// routes for APIs auth
var authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// routes for resources
var resourcesRoutes = require('./routes/resources');
app.use('/resources', resourcesRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// -----------------

// error handlers
app.use(require('./controllers/middleware/error'));

module.exports = app;
