var models = require('../models/models.js');

//GET /quizes/:quizId/comments/new
exports.new = function(req, res) {
	res.render('comments/new.ejs', {quizid: req.params.quizId, errors: []});
};

//POST /quizes/:quizId/comments
exports.create = function(req, res) {
	var comment = models.Comment.build(
		{ texto: req.body.comment.texto,
			// La relación belongsTo(...) de Comment a Quiz añade un parámetro adicional en cada elemento de la tabla Comments que indica el quiz asociado
			// Se utiliza el nombre quizId definido en la ruta "routes/index.js"
			QuizId: req.params.quizId
		});

	comment.validate().then(
		function(err){
			if (err) {
				res.render('comments/new.ejs',
					{comment: comment, quizid: req.params.quizId, errors: err.errors});
			} else {
				// Se guarda en la BD el campo texto de comment y se redirecciona a la lista de preguntas
				comment.save().then( function(){ res.redirect('/quizes/' + req.params.quizId)})
			}
		}
		).catch(function(error){next(error)});
};