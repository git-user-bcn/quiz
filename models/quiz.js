// Se define la tabla Quiz, que tendrá 3 campos de tipo String (pregunta, respuesta e índice temático)

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Quiz', 
	{ pregunta: {
		type: DataTypes.STRING,
		validate: { notEmpty: {msg: "-> Falta escribir la pregunta"}}
	},
		respuesta: {
			type: DataTypes.STRING,
			validate: { notEmpty: {msg: "-> Fata escribir la respuesta"}}
	},
		indice_tematico: {
			type: DataTypes.ENUM('Otro','Humanidades','Ocio','Ciencia','Tecnología'),
			validate: { notEmpty: {msg: "-> Falta seleccionar la temática de la pregunta"}}		
		}
	}
	);
}