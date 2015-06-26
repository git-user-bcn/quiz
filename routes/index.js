// Enrutador para la ruta vacía
var express = require('express');
// Se genera un enrutador básico en la variable router
var router = express.Router();
// Se importa quiz_controller.js
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
// Establecemos la ruta vacía en el router, que renderizará el fichero index
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

// Introducimos dos nuevas rutas en el enrutador. Nos lleva a ejecutar las acciones asociadas a question y answer definidas en el controlador
router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

// Introducimos una nueva ruta en el enrutador, para la vista del autor de la página
router.get('/author', function(req, res) {
	res.render('author', { autor: 'David Monné Chávez' });
});

// Se exporta el enrutador con los Middlewares instalados
module.exports = router;
