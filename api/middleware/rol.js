const { handleHttpError } = require('../utils/handleError')

const checkRol = (roles) => (req, res, next) => {
    try {
        const user = req.user
        const userRole = user.role
        const checkRole = roles.includes(userRole)

        if (!checkRole) {
            handleHttpError(res, "NOT_ALLOWED", 403)
            return
        }

        next()

    } catch (error) {
        handleHttpError(res, "ERROR_PERMISIONS", 403)
    }
}

module.exports = checkRol
