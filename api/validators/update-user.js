const { check } = require('express-validator');
const validateResults = require("../utils/handleValidator")

const updateUserValidator = [
    check('name').isLength({ min: 2, max: 30 }).isString().withMessage('Error en el nombre').optional(),
    check('email').isEmail().isLength({ min: 5, max: 30 }).withMessage('Error en el email').optional(),
    check('password').isString().isLength({ min: 6, max: 30 }).withMessage('Error en la contraseña').optional(),
    check('age').isInt().withMessage('Error en la edad')
    .custom(value => {
            if ( value < 0 || value > 150 ) {
                throw new Error('La edad debe estar entre 0 y 150 años')
            }
            return true
        }
    ).optional(),
    check('city').isString().isLength({ min: 2, max: 30 }).withMessage('Error en la ciudad').optional(),
    check('interests').isString().isLength({ min: 2, max: 30 }).withMessage('Error en los intereses').optional(),
    check('recibeOffers').isBoolean().withMessage('Error en el campo de recibir ofertas').optional(),
    (req, res, next) => {
        validateResults(req, res, next)
    }
]

module.exports = updateUserValidator
