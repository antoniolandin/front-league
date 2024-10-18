'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class commerce extends Model {
        /**
        * Helper method for defining associations.
        * This method is not a part of Sequelize lifecycle.
        * The `models/index` file will call this method automatically.
        */
        static associate(models) {
            commerce.hasOne(models.webpage, {
                foreignKey: 'commerceId',
                as: 'webpage'
            });
        }
    }
    commerce.init(
        {
            name: {
                type: DataTypes.STRING
            },
            CIF: {
                type: DataTypes.STRING,
                unique: {
                    args: true,
                    msg: 'El CIF ya está en uso'
                }
            },
            address: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING
            },
            phone: {
                type: DataTypes.STRING
            }
        },
        {
            sequelize,
            modelName: 'commerce',
        }
    );

    return commerce;
};
