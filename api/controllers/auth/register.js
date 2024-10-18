const { user } = require('../../models')
const { handleError } = require('../../utils/handleError')
const { tokenSign } = require('../../utils/handleJwt')

// Función para registrar un usuario en la base de datos
register = async (req, res) => {
    try {
        // Descartamos el campo role en la petición
        req.body.role = 'user'

        // Creamos al usuario en la base de datos
        const userData = await user.create(req.body)
        
        // Eliminamos la contraseña del objeto del usuario (motivos de seguridad)
        userData.set('password', undefined, { strict: false })
        
        // Creamos la respuesta que enviaremos al cliente
        const data = {
            token: tokenSign(userData),
            user: userData
        }
        
        // Enviamos al cliente el token y los datos del usuario
        res.status(201).json(data)
    }
    catch (error) {
        handleError(res, error, 400)
    } 
}

module.exports = register
