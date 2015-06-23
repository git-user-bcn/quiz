var express = require('express');
// Se genera un enrutador genérico
var router = express.Router();

/* GET users listing. */
// Mira la ruta vacía (pero que en realidad es después de users, ya que el Middleware en app.js se instaló con la ruta /users)
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

// Se exporta el enrutador con los Middlewares instalados
module.exports = router;
