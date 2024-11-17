'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jugadores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Jugadores.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    id_equipo: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    primer_apellido: DataTypes.STRING,
    segundo_apellido: DataTypes.STRING,
    grado: DataTypes.STRING,
    curso: DataTypes.STRING,
    goles: DataTypes.INTEGER,
    partidos_jugados: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Jugadores',
  });
  return Jugadores;
};
