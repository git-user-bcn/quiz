// GET /quizes/question
exports.question = function(req, res) {
	res.render('quizes/question', {pregunta: 'Capital de Italia'});
};

// GET /quizes/answer
exports.answer = function(req, res) {
	// Si la respuesta es Roma, la respuesta será Correcto
	if (req.query.respuesta === 'Roma') 
	{
		res.render('quizes/answer', {respuesta: 'Correcto'});	
	}
	// En caso contrario, será Incorrecto
	else
	{
		res.render('quizes/answer', {respuesta: 'Incorrecto'});
	}
};