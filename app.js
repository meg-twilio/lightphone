// --------------------- MODULES --------------------- //

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// --------------------- INSTANCED MODULES --------------------- //

const router = require('./src/router');

const app = express();

const PORT = process.env.PORT || 8080;

// --------------------- MIDDLEWARE --------------------- //

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

// --------------------- ERROR HANDLERS --------------------- //

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {},
  });
});



// --------------------- START SERVER --------------------- //
app.listen(PORT, function() {
	console.log(`Twilio Client app HTTP server running on Port ${PORT}`)
});
