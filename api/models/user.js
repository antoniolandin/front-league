'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        // define association here
        }
    }
    user.init(
    {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: 'El email ya está en uso'
            }
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'user'
        },
        password: {
            type: DataTypes.STRING
        },
        age: {
            type: DataTypes.INTEGER
        },
        city: {
            type: DataTypes.STRING
        },
        interests: {
            type: DataTypes.STRING
        },
        recibeOffers: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        sequelize,
        modelName: 'user',
        hooks: {
            afterValidate: async (user) => {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    });

    return user;
};
