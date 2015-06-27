// Se define la tabla Quiz, que tendrá 2 campos de tipo String (pregunta y respuesta)

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Quiz', 
	{ pregunta: DataTypes.STRING,
		respuesta: DataTypes.STRING,
	});
}