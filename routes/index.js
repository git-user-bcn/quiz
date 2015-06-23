// Enrutador para la ruta vacía
var express = require('express');
// Se genera un enrutador básico en la variable router
var router = express.Router();

/* GET home page. */
// Establecemos la ruta vacía en el router, que renderizará el fichero index
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

// Se exporta el enrutador con los Middlewares instalados
module.exports = router;
