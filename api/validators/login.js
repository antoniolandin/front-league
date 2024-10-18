const { check } = require('express-validator')
const validateResults = require("../utils/handleValidator")

const loginValidator = [
    check('email').exists().withMessage('El email es requerido'),
    check('email').isEmail().withMessage('Email no válido'),
    check('email').notEmpty().withMessage('El email es requerido'),
    check('email').isLength({ min: 4, max: 30 }).withMessage('El email debe tener entre 4 y 30 caracteres'),
    check('email').isString().withMessage('El email debe ser un string'),
    check('password').exists().withMessage('La contraseña es requerida'),
    check('password').notEmpty().withMessage('La contraseña es requerida'),
    check('password').isLength({ max: 30 }).withMessage('La contraseña debe tener menos de 30 caracteres'),
    check('password').isString().withMessage('La contraseña debe ser un string'),
    (req, res, next) => {
        validateResults(req, res, next)
    },
]

module.exports = loginValidator
