'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Jugadores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_equipo: {
        type: Sequelize.INTEGER,
        references: {
            model: {
                tableName: 'Equipos'
            },
            key: 'id',
        },
        onUpdate: "CASCADE",
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      primer_apellido: {
        type: Sequelize.STRING
      },
      segundo_apellido: {
        type: Sequelize.STRING
      },
      grado: {
        type: Sequelize.STRING
      },
      curso: {
        type: Sequelize.STRING
      },
      goles: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      partidos_jugados: {
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
    await queryInterface.dropTable('Jugadores');
  }
};
