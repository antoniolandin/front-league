const { check } = require('express-validator');
const validateResults = require("../utils/handleValidator")

const updateCommerceValidator = [
    check('name').isString().isLength({ min: 3, max: 50 }).withMessage('Error en el nombre').optional(),
    check('address').isString().isLength({ min: 3, max: 50 }).withMessage('Error en la dirección').optional(),
    check('email').isEmail().withMessage('Error en el email').optional(),
    check('phone').isString().isMobilePhone().withMessage('Error en el teléfono').optional(),
    (req, res, next) => {
        validateResults(req, res, next)
    }
]

module.exports = updateCommerceValidator
