var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
///adding mongoose
var mongoose = require('mongoose');
var passport = require('passport');
var socketIO = require('socket.io');
var LocalStrategy = require('passport-local').Strategy;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/auth')
 .then(() => console.log('connection succesful'))
.catch((err) => console.error(err));

var db = mongoose.connection;

var sessionOptions = {
  secret: 'this is a not so secret secret',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: db
  })
};

var index = require('./routes/index');
var users = require('./routes/users'); 
var employees = require('./routes/employees');

var app = express();

app.use(session(sessionOptions));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/employees', employees);

var User = require('./models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

var PORT = process.env.PORT || 3000;

var server = http.createServer(app);
var io = socketIO(server)

io.on('connection', (socket) => {
  console.log('new user connected');
})

server.listen(PORT, function() {
  console.log('app is running on port 3000')
});