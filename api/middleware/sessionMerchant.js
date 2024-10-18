const { handleHttpError } = require('../utils/handleError');
const { tokenVerify } = require('../utils/handleJwt');
const { commerce } = require('../models');

const authMiddlewareMerchant = async (req, res, next) => {
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
        const commerceData = await commerce.findByPk(dataToken.id);
        
        // Si no existe el usuario
        if (!commerceData) {
            return handleHttpError(res, 'MERCHANT_NOT_FOUND', 404)
            return
        }

        // Eliminamos la contraseña del objeto del usuario (motivos de seguridad)
        
        // Guardamos el usuario en la petición
        req.commerce = commerceData;
        req.webpageId = dataToken.webpageId;

        next()
    }
    catch (error) {
        return handleHttpError(res, "NOT_SESSION", 401)
    }
}

module.exports = authMiddlewareMerchant;
