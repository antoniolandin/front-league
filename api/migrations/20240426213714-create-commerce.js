'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('commerces', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            CIF: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            address: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
    }).then(() => queryInterface.createTable('webpages', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            commerceId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'commerces',
                    key: 'id'
                }
            },
            city: {
                type: Sequelize.STRING
            },
            activity: {
                type: Sequelize.STRING
            },
            title: {
                type: Sequelize.STRING
            },
            summary: {
                type: Sequelize.STRING
            },
            scoring: {
                type: Sequelize.FLOAT
            },
            numReviews: {
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
        }).then(() => queryInterface.createTable('reviews', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            webpageId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'webpages',
                    key: 'id'
                }
            },
            text: {
                type: Sequelize.STRING
            },
            rating: {
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

        }))
    )},
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('reviews');
        await queryInterface.dropTable('webpages');
        await queryInterface.dropTable('commerces');
    }
};
