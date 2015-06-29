// El controlador importa el modelo para poder acceder a la BD
var models = require('../models/models.js');

// Con los métodos models.Quiz.findAll() o find() buscamos los datos en la tabla Quiz y los procesamos en el callback del método success(..)

// GET /quizes
exports.index = function(req, res) {
	models.Quiz.findAll().then(function(quizes) {
		res.render('quizes/index.ejs', { quizes: quizes});
	})
};

// GET /quizes/:id
exports.show = function(req, res) {
	models.Quiz.find(req.params.quizId).then(function(quiz) {
		res.render('quizes/show', { quiz: quiz});
	})
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
	models.Quiz.find(req.params.quizId).then(function(quiz)  {
		// Si la respuesta es Roma, la respuesta será Correcto
		if (req.query.respuesta === quiz.respuesta) 
		{
			res.render('quizes/answer', { quiz: quiz, respuesta: 'Correcto'});	
		}
		// En caso contrario, será Incorrecto
		else
		{
			res.render('quizes/answer', {quiz: quiz, respuesta: 'Incorrecto'});
		}
	})
};