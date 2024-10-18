'use strict'

const {
    Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class review extends Model {
        static associate(models) {
            review.belongsTo(models.webpage)
        }
    }

    review.init({
        text: DataTypes.STRING,
        rating: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'review',
    })

    return review
}
