var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLITE DATABASE_URL = sqlite://:@:/
// Extraemos los componentes de la DATABASE_URL con expresiones regulares, que devuelve un array con parámetros
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

// Cargar el modelo ORM (Object Relational Mapping)
// Transforma objetos y métodos de acceso en operaciones SQL y viceversa (utilizado con RDBMS)
var Sequelize = require('sequelize');

// Para usar la BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd, 
	{ dialect: protocol,
	  protocol: protocol,
	  port: port,
	  host: host,
	  storage: storage, // solo SQLite (.env)
	  omitNull: true    // solo Postgres
	}
);

// Se importa la definición de la tabla Quiz en quiz.js
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

// Importar la definición de la tabla Comment
var comment_path = path.join(__dirname, 'comment');
var Comment = sequelize.import(comment_path);

// Relación 1 a N entre Quiz y Comment (1 quiz tiene muchos comentarios)
// Se añade un borrado en cascada. De esta forma, al eliminar una pregunta, se eliminan también sus comentarios
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment, { onDelete: 'cascade', hooks: true });
// Info sacada de: docs.sequelizejs.com/en/latest/docs/hooks
// "Adding hooks: true explicitly tells Sequelize that optimization is not of your concern and will perform a SELECT on the associated
// objects and destroy each instance one by one in order to be able to call the hooks with the right parameters"

// Se exporta la definición de la tabla Quiz y la tabla Comment, por si la necesitan usar otros ficheros
exports.Quiz = Quiz;
exports.Comment = Comment;

// El método sequelize.sync() crea automáticamente el fichero quiz.sqlite e inicializa la tabla de preguntas en la BD, si no existe
// Si existe sincroniza con nuevas definiciones del modelo, seimpre que sean compatibles con anteriores.
// then(..) ejecuta el manejador una vez creada la tabla
sequelize.sync().then(function() {
	Quiz.count().then(function (count) {
		// Si el nº de filas es 0, crea la primera pregunta y la guarda en la tabla
		if (count === 0) {
			Quiz.bulkCreate(
				[ { pregunta: 'Capital de Italia', respuesta: 'Roma', indice_tematico: 'Humanidades'},
				  { pregunta: 'Capital de Portugal', respuesta: 'Lisboa', indice_tematico: 'Humanidades'},
				  { pregunta: 'Capital de España', respuesta: 'Madrid', indice_tematico: 'Humanidades'},
				  { pregunta: 'Capital de Francia', respuesta: 'París', indice_tematico: 'Humanidades'},
				  { pregunta: 'Capital de Alemania', respuesta: 'Berlín', indice_tematico: 'Humanidades'}
				]
			).then(function(){console.log('Base de datos inicializada')});
		};
	});
});