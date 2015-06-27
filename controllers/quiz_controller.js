// El controlador importa el modelo para poder acceder a la BD
var models = require('../models/models.js');

// Con los métodos models.Quiz.findAll() o find() buscamos los datos en la tabla Quiz y los procesamos en el callback del método success(..)

// GET /quizes/question
exports.question = function(req, res) {
	models.Quiz.findAll().success(function(quiz) {
	res.render('quizes/question', { pregunta: quiz[0].pregunta});
	})
};

// GET /quizes/answer
exports.answer = function(req, res) {
	models.Quiz.findAll().success(function(quiz)  {
	// Si la respuesta es Roma, la respuesta será Correcto
	if (req.query.respuesta === quiz[0].respuesta) 
	{
		res.render('quizes/answer', {respuesta: 'Correcto'});	
	}
	// En caso contrario, será Incorrecto
	else
	{
		res.render('quizes/answer', {respuesta: 'Incorrecto'});
	}
	})
};