'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Equipos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      partidos_jugados: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      victorias: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      derrotas: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      empates: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      puntos: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      goles_favor: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      goles_contra: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Equipos');
  }
};
