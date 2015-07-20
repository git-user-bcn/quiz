// Se define la tabla Quiz, que tendrá 2 campos de tipo String (pregunta y respuesta)

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Quiz', 
	{ pregunta: {
		type: DataTypes.STRING,
		validate: { notEmpty: {msg: "-> Falta escribir la pregunta"}}
	},
		respuesta: {
			type: DataTypes.STRING,
			validate: { notEmpty: {msg: "-> Fata escribir la respuesta"}}
		}
	}
	);
}