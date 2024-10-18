const { user } = require('../../models')
const { handleHttpError } = require('../../utils/handleError')
const { comparePassword } = require('../../utils/handlePassword')
const { tokenSign } = require('../../utils/handleJwt')

// Función para iniciar sesión (con email y contraseña)
login = async (req, res) => {
    
    try {
        // Buscamos al user en la base de datos
        const userData = await user.findOne({
            where : {
                email: req.body.email
            }
        })

        // Verificamos si el user existe
        if (!userData) {

            // Enviamos al cliente un mensaje de error
            handleHttpError(res, 'Admin no existe', 404)
            return
        }

        // Verificamos si la contraseña es correcta
        const passwordMatch = await comparePassword(req.body.password, userData.password)

        if (!passwordMatch) {
            // Enviamos al cliente un mensaje de error
            handleHttpError(res, 'Contraseña incorrecta', 401)
            return
        }

        // Eliminamos la contraseña del objeto del user (motivos de seguridad)
        userData.set('password', undefined, { strict: false })

        // Creamos la respuesta que enviaremos al cliente
        const data = {
            token: tokenSign(userData),
            user: userData
        }

        // Enviamos al cliente el token y los datos del user
        res.status(200).json(data)
    }
    catch (error) {
        // Enviamos al cliente un mensaje de error
        handleHttpError(res, error.message, 401)
    }
}

module.exports = login
