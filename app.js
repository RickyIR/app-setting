var createError = require('http-errors');
var express = require('express');
const path = require('path');
const dotenv = require('dotenv').config({path: './.env'});

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/**
 * Core
 */

const core = require('./server/core/core');

core.initDefault(app);

/**
 * Routes
 */
const Routes = require('./server/routes/index.route');

Routes.init(app);

app.use('/app', express.static(path.join(__dirname, './angular/dist/hadleyApp')));

app.get('/app', (req, res, next) => {
  res.render('index');
})

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
  res.send('error');
});

app.listen(3000, () => {
  console.log('hadley app runs on port 3000');
});
