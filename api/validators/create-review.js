const { check } = require('express-validator')
const validateResults = require("../utils/handleValidator")

const createReviewValidator = [
    check('rating').exists().isInt().custom(value => value >= 1 && value <= 5).withMessage('El rating es requerido y debe ser un número entre 1 y 5'),
    check('text').isString().isLength({ min: 1, max: 500 }).optional().withMessage('El texto debe ser un string y tener entre 1 y 500 caracteres'),
    (req, res, next) => {
        validateResults(req, res, next)
    }
]

module.exports = createReviewValidator
