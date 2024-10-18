const { validationResult } = require('express-validator');

const validateResults = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (error) {
        return res.status(403).json({ errors: error.array() });
    }
}

module.exports = validateResults;
