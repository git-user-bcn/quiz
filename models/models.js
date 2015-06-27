var path = require('path');

// Cargar el modelo ORM (Object Relational Mapping)
// Transforma objetos y métodos de acceso en operaciones SQL y viceversa (utilizado con RDBMS)
var Sequelize = require('sequelize');

// Para usar la BBDD SQLite
var sequelize = new Sequelize(null, null, null, {dialect: "sqlite", storage: "quiz.sqlite"});

// Se importa la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

// Se exporta la definición de la tabla Quiz, por si la necesitan usar otros ficheros
exports.Quiz = Quiz;

// El método sequelize.sync() crea automáticamente el fichero quiz.sqlite e inicializa la tabla de preguntas en la BD, si no existe
// Si existe sincroniza con nuevas definiciones del modelo, seimpre que sean compatibles con anteriores.
// success(..) ejecuta el manejador una vez creada la tabla
sequelize.sync().success(function() {
	Quiz.count().success(function (count) {
		// Si el nº de filas es 0, crea la primera pregunta y la guarda en la tabla
		if (count === 0) {
			Quiz.create({ pregunta: 'Capital de Italia',
						  respuesta: 'Roma'
						})
			.success(function(){console.log('Base de datos inicializada')});
		};
	});
});