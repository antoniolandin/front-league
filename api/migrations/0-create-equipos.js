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
        type: Sequelize.STRING
      },
      partidos_jugados: {
        type: Sequelize.INTEGER
      },
      victorias: {
        type: Sequelize.INTEGER
      },
      derrotas: {
        type: Sequelize.INTEGER
      },
      empates: {
        type: Sequelize.INTEGER
      },
      puntos: {
        type: Sequelize.INTEGER
      },
      goles_favor: {
        type: Sequelize.INTEGER
      },
      goles_contra: {
        type: Sequelize.INTEGER
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
