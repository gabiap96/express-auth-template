const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const expressLayouts = require('express-ejs-layouts');

const secrets = require('./configs/secrets');
console.log('secrets: ', secrets);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const app = express();

// Passport Config
require('./configs/passport')(passport);

// view engine setup
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
}));

/* mongoose connection*/
mongoose.connect(`mongodb://${secrets.database.username}:${secrets.database.password}@ds219832.mlab.com:19832/template_app`,
    {useNewUrlParser: true, useUnifiedTopology: true}).then(function () {
      console.log('Connected');
}).catch(function (err) {
  throw err;
});


// Express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
