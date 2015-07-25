// Enrutador para la ruta vacía
var express = require('express');
// Se genera un enrutador básico en la variable router
var router = express.Router();
// Se importa quiz_controller.js, comment_controller.js y session_controller.js
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
// Establecemos la ruta vacía en el router, que renderizará el fichero index
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

// Autoload de comandos con :quizId
// Se instala con el método param() de express, para que sólo invoque quizController.load si existe el parámetro :quizId
router.param('quizId', quizController.load);

// Definición de rutas de sesión (formulario login, crear sesión y destruir sesión)
router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

// Definición de rutas de /quizes. Nos lleva a ejecutar las acciones asociadas a question y answer definidas en el controlador
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

// Introducimos una nueva ruta en el enrutador, para la vista del autor de la página
router.get('/author', function(req, res) {
	res.render('author', { autor: 'David Monné Chávez', errors: []});
});

// Se exporta el enrutador con los Middlewares instalados
module.exports = router;
