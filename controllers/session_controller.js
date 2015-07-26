// MW de autorización de accesos HTTP restringidos
// Solo deja continuar al usuario si está autenticado, de lo contrario solo le da acceso a la pantalla de login
exports.loginRequired = function(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		res.redirect('/login');
	}
};

//GET /login (formulario de login)
exports.new = function(req, res) {
	var errors = req.session.errors || {};
	req.session.errors = {};

	res.render('sessions/new', {errors: errors});
};

//POST /login (crear la sesión)
exports.create = function(req, res) {
	var login = req.body.login;
	var password = req.body.password;

	var userController = require('./user_controller');
	userController.autenticar(login, password, function(error, user) {

		// Si se produce un error devolvemos los mensajes de error de sesión y se vuelve a la pantalla de login
		if (error) {
			req.session.errors = [{"message": 'Se ha producido un error: ' + error}];
			res.redirect("/login");
			return;
		}

		// Si no ha habido error, se crea req.session.user y se guardan los campos "id" y "username"
		// La sesión se define por la existencia de "req.sesion.user"
		req.session.user = {id:user.id, username:user.username};

		// Se crea una variable para controlar el tiempo de expiración (2 mins = 2 * 60 * 1000) mins * segundos * milisegundos
		req.session.tiempo_expirado = (new Date()).getTime() + 120000;

		// Se redirecciona al path anterior a login
		res.redirect(req.session.redir.toString());
	});
};

//DELETE /logout (destruir sesión)
exports.destroy = function(req, res) {
	// Se borra la sesión y se redirecciona al path anterior a login
	delete req.session.user;
	res.redirect(req.session.redir.toString());
};