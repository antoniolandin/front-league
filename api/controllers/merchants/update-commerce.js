const { commerce } = require('../../models')
const { handleError, handleHttpError } = require('../../utils/handleError')
const { tokenSign } = require('../../utils/handleJwt')
const log = require('../../utils/handleConsoleLog')

updateCommerce = async (req, res) => {
    try {
        // Obtenemos el id del comercio a través de la URL
        const id = req.params.id

        // Comprobamos que el id sea un número
        if (isNaN(id)) {
            handleHttpError(res, 'El id debe ser un número', 400)
            return
        }

        // Actualizamos el comercio en la base de datos
        const commerceUpdated = await commerce.update(req.body, {
            where: {
                id: id
            }
        })

        // Enviamos al cliente la respuesta
        res.status(200).json(commerceUpdated) 
    }
    catch (error) {
        handleError(res, error, 400)
    }
}

module.exports = updateCommerce

