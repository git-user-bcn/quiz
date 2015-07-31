// Definición del modelo de Comment con validación
module.exports = function(sequelize, DataTypes) {
	return sequelize.define(
		'Comment', { 
			texto: {
			type: DataTypes.STRING,
			validate: { notEmpty: {msg: "-> Falta escribir un comentario"}}
		},
		publicado: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	},
	{
		classMethods: {
			comentarios_sin_publicar: function() {
				return this.count({ where: { publicado: false } });
			},
			preguntas_comentadas: function() {
				return this.aggregate('QuizId', 'count', { distinct: true } );
			}
		}
	}
)};