const { check } = require('express-validator')
const validateResults = require("../utils/handleValidator")

const updateWebpageValidator = [
    check('title').isString().isLength({ min: 1, max: 30 }).withMessage('Error en el título').optional(),
    check('city').isString().isLength({ min: 1, max: 30 }).withMessage('Error en la ciudad').optional(),
    check('summary').isString().isLength({ min: 1, max: 200 }).withMessage('Error en el resumen').optional(),
    check('activity').isString().isLength({ min: 1, max: 30 }).withMessage('Error en la actividad').optional(),
    (req, res, next) => {
        validateResults(req, res, next)
    }
]

module.exports = updateWebpageValidator
