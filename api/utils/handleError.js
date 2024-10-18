const log = require('./handleConsoleLog')
const loggerStream = require('./handleLogger')
require('colors')

// Función para manejar los errores de la aplicación
const handleHttpError = (res, message, code) => {
    // Enviamos al cliente un mensaje de error
    res.status(code).json({ message })
}

const handleError = (res, error, code) => {
        // Los errores de validación de Sequelize vienen en un objeto error.errors (lista de errores)
        if (error.errors) {
            // Extraemos todos los errores del objeto error
            errores = error.errors.map(e => e.message)

            // Juntamos todos los errores en un solo string
            mensaje_error = errores.join('\n')
        }
        else {
            // Si no hay errores de validación, mostramos el mensaje de error normal
            mensaje_error = error.message
        }
        
        // // Mostramos en consola que ha ocurrido un error al registrar el comercio
        // log(
        //     title.bgRed,
        //     JSON.stringify(req.body, null, 2).brightYellow,
        //     mensaje_error.brightRed
        // )
               
        // Enviamos al cliente un mensaje de error
        handleHttpError(res, mensaje_error, code)
}

module.exports = { handleHttpError, handleError }
 
