var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser'),
swaggerJsdoc = require('swagger-jsdoc'),
swaggerUi = require('swagger-ui-express');

var countriesRouter = require('./routes/countries/helper/country');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(countriesRouter);

/**
 * Options for swagger path.
 */
const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Country Search App',
      version: '0.1.0',
      description:
        'An API to search for country information',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

/**
 * Gets the specs from JsDoc in each file defined in options.
 */
const specs = swaggerJsdoc(options);

/**
 * Hosts the API help page.
 */
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

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
