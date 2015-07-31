// Enrutador para la ruta vacía
var express = require('express');
// Se genera un enrutador básico en la variable router
var router = express.Router();
// Se importa quiz_controller.js, comment_controller.js, session_controller.js y estatistics_controller.js
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var statisticsController = require('../controllers/statistics_controller');

/* GET home page. */
// Establecemos la ruta vacía en el router, que renderizará el fichero index
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

// Autoload de comandos con :quizId
// Se instala con el método param() de express, para que sólo invoque quizController.load si existe el parámetro :quizId
router.param('quizId', quizController.load);
// Autoload :commentId (el comentario estará disponible cuando la acción publish se ejecute)
router.param('commentId', commentController.load);

// Definición de rutas de sesión (formulario login, crear sesión y destruir sesión)
router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

// Definición de rutas de /quizes. Nos lleva a ejecutar las acciones asociadas a question y answer definidas en el controlador
// Una ruta puede invocarse con varios MWs en serie. El primer MW ha de pasar el control al siguiente con next() para que se ejecute
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
// Al añadir sessionController.loginRequired delante de los controladores de acceso que necesitan autenticación, se impide
// que usuarios sin sesión ejecuten operaciones de crear, editar o borrar recursos
router.get('/quizes/new', sessionController.loginRequired, quizController.new);
router.post('/quizes/create', sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.destroy);

// Definición de rutas de comentarios
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);

// Definición de la ruta para las estadísticas
router.get('/quizes/statistics', statisticsController.analizaQuiz, statisticsController.show);

// Introducimos una nueva ruta en el enrutador, para la vista del autor de la página
router.get('/author', function(req, res) {
	res.render('author', { autor: 'David Monné Chávez', errors: []});
});

// Se exporta el enrutador con los Middlewares instalados
module.exports = router;
