// El controlador importa el modelo para poder acceder a la BD
var models = require('../models/models.js');

// Con los métodos models.Quiz.findAll() o find() buscamos los datos en la tabla Quiz y los procesamos en el callback del método success(..)

// Autoload. Factoriza el código si la ruta incluye: quizId
// Se busca el quizId en la BD, y se ejecuta una función que, si lo ha encontrado, 
// lo asigna a req.quiz y ejecuta un next() para que se ejecute el Middleware correspondiente
// En caso contraio, se muestra un mensaje de que no se ha encontrado
exports.load = function(req, res, next, quizId) {
	models.Quiz.find(quizId).then(
		function(quiz) {
			if (quiz) {
				req.quiz = quiz;
				next();
			} else { next(new Error('No existe quizId= ' + quizId)); }
		}
		).catch(function(error) { next(error);});
};

// GET /quizes?search=texto_a_buscar
// Se buscarán las preguntas que contengan el texto especificado en la query
exports.index = function(req, res) {
	var search = req.query.search;
	var condicion = ('%' + search + '%').replace(/ /g,'%');

	// Si se ha introducido algún parámetro de búsqueda, se prepara la variable search y se realize la query con la condición WHERE
	if (search) {
		models.Quiz.findAll({
			where:["pregunta like ?", condicion],
			order: [['pregunta', 'ASC']]
		}).then(function(quizes){
			res.render('quizes/index',{quizes : quizes});
		}).catch(function(error) {next(error);});
		// En caso contrario, se realiza la búsqueda sin la condición WHERE
	} else {
		models.Quiz.findAll().then(function(quizes) {
			res.render('quizes/index', { quizes: quizes});
	}).catch(function(error) {next(error);});
	}
}
	
// GET /quizes/:id
exports.show = function(req, res) {
	res.render('quizes/show', { quiz: req.quiz});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
	var resultado = 'Incorrecto';
	// Si la respuesta es correcta, se actualiza el resultado
	if (req.query.respuesta === req.quiz.respuesta) 
	{
		resultado = 'Correcto';
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};