const { commerce } = require('../../models')
const { handleError } = require('../../utils/handleError')

const getCommerce = async (req, res) => {
    try {
        // Obtener la id de la url
        const id = req.params.id

        // Comprobar que la id es numérica
        if (isNaN(id)) {
            handleError(res, 'La id debe ser numérica', 400)
            return
        }
        
        // Obtener el comercio por id
        const commerceId = await commerce.findByPk(id)
        
        // Enviamos la respuesta
        res.status(200).json(commerceId)
    } catch (error) {
        handleError(res, error, 400)
    }
}

module.exports = getCommerce
