const { handleHttpError } = require('../utils/handleError');
const { tokenVerify } = require('../utils/handleJwt');
const { user } = require('../models');

const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return handleHttpError(res, 'NOT_TOKEN', 401)
            return
        }

        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await tokenVerify(token);

        if (!dataToken.id) {
            return handleHttpError(res, 'ERROR_ID_TOKEN', 401)
            return
        }

        // Buscamos al usuario en la base de datos
        const userData = await user.findByPk(dataToken.id);
        
        // Si no existe el usuario
        if (!userData) {
            return handleHttpError(res, 'USER_NOT_FOUND', 404)
            return
        }

        // Eliminamos la contraseña del objeto del usuario (motivos de seguridad)
        userData.set('password', undefined, { strict: false })
        
        // Guardamos el usuario en la petición
        req.user = userData;

        next()
    }
    catch (error) {
        return handleHttpError(res, "NOT_SESSION", 401)
    }
}

module.exports = authMiddleware;
