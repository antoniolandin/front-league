const { check } = require('express-validator');
const validateResults = require("../utils/handleValidator")

const registerUserValidator = [
    check('name').exists().withMessage('El nombre es obligatorio'),
    check('name').isLength({ min: 2, max: 30 }).withMessage('El nombre debe tener entre 2 y 30 caracteres'),
    check('name').isString().withMessage('El nombre debe ser un texto'),
    check('email').exists().withMessage('El email es obligatorio'),
    check('email').isEmail().withMessage('El email no es válido'),
    check('email').isLength({ min: 5, max: 30 }).withMessage('El email debe tener entre 5 y 50 caracteres'),
    check('password').exists().withMessage('La contraseña es obligatoria'),
    check('password').isLength({ min: 6, max: 30 }).withMessage('La contraseña debe tener entre 6 y 30 caracteres'),
    check('password').isString().withMessage('La contraseña debe ser un texto'),
    check('age').isInt().withMessage('La edad debe ser un número entero').optional(),
    check('age').custom(value => {
            if ( value < 0 || value > 150 ) {
                throw new Error('La edad debe estar entre 0 y 150 años')
            }
            return true
        }
    ).optional(),
    check('city').isString().withMessage('La ciudad debe ser un texto').optional(),
    check('city').isLength({ min: 2, max: 30 }).withMessage('La ciudad debe tener entre 2 y 30 caracteres').optional(),
    check('interests').isString().withMessage('Los intereses deben ser un texto').optional(),
    check('interests').isLength({ min: 2, max: 30 }).withMessage('Los intereses deben tener entre 2 y 30 caracteres').optional(),
    check('recibeOffers').isBoolean().withMessage('Recibe ofertas debe ser un booleano').optional(),
    (req, res, next) => {
        validateResults(req, res, next)
    }
]

module.exports = registerUserValidator
