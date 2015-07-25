var users = { admin: {id:1, username:"admin", password:"1234"},
			  pepe: {id:2, username:"pepe", password:"5678"}
			};

// Se comprueba si el usuario está registrado en users
exports.autenticar = function(login, password, callback) {
	if (users[login]) 
	{
		// Se comprueba si el password es correcto
		if (password === users[login].password) 
		{
			callback(null, users[login]);
		}
		// En caso contrario, se informa al usuario mediante un mensaje de error
		else 
		{ 
			callback(new Error('Password erróneo')); 
		}
	} 
	// Si no se encuentra al usuario, se muestra un mensaje de error
	else 
	{ 
		callback(new Error('Usuario inexistente')); 
	}
};