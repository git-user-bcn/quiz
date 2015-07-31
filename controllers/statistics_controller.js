// El controlador importa el modelo para poder acceder a la BD y el componente sequelize, para poder usar Promise
var models = require('../models/models.js');
var sequelize = require('sequelize');

// La variable statistics se compone de: preguntas (quizes), nº de comentarios y nº de preguntas con comentarios
var estadisticas = {
	quizes: 0,
	comentarios_total:0,
	pregs_comentadas: 0,
	coments_sin_pub: 0,
};

// Se utiliza el método Promise.all, ya que de esta forma se ejecutan las diferentes consultas en paralelo
// Una vez se han ejecutado todas, se continúa ...
exports.analizaQuiz = function (req, res, next) {
	sequelize.Promise.all([
		models.Quiz.count(),
		models.Comment.count(),
		models.Comment.preguntas_comentadas(),
		models.Comment.comentarios_sin_publicar()
		]).then (function (values) {
			// Se asignan los diferentes valores a la variable estadisticas.X
			estadisticas.quizes = values[0];
			estadisticas.comentarios_total = values[1];
			estadisticas.pregs_comentadas = values[2];
			estadisticas.coments_sin_pub = values[3];
		}).catch(function (err) {
			next(err);
	}).finally(function () {
		next();
	});
};

//GET /quizes/statistics
exports.show = function (req, res) {
	res.render('stats_show', { estadisticas: estadisticas, errors: [] });
};