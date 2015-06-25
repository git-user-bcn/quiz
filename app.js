// Se importan todos los paquetes necesarios, así como paquetes con Middlewares
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Se importa el módulo express-partials
var partials = require('express-partials');

// Se importa también el enrutador
var routes = require('./routes/index');

// Se crea la aplicación
var app = express();

// view engine setup
// Path donde están las vistas y parámetro View Engine, generador de vistas EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Se instala el Middleware express-partials
app.use(partials());

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));

// Se instalan todos los Middlewares asociados anteriormente
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Se instala el enrutador que se importó anteriormente
app.use('/', routes);

// catch 404 and forward to error handler
// Middleware que procesará el resto de rutas que no sean las 2 de arriba (ruta vacía y ruta /users)
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    // Se invoca el siguiente Middleware de error
    next(err);
});

// Error Handlers

// development error handler: will print stacktrace
// Si estamos en la fase de desarrollo, se instalará el siguiente Middleware
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        // Se renderiza una pequeña vista mostrando el mensaje
        res.render('error', {
            message: err.message,
            // El stack de errores contendrá mucha información sobre cualquier posible error
            error: err
        });
    });
}

// production error handler: no stacktraces leaked to user
// Gestión de errores de producción. Realiza lo mismo que el anterior excepto por el stack de errores, que estará vacío
// Por lo que el mensaje será mucho más simple
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    // Se renderiza una pequeña vista mostrando el mensaje
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
