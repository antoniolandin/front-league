const { commerce, webpage } = require('../../models')
const { handleHttpError } = require('../../utils/handleError')

// Función para darse de baja de la web
deleteCommerce = async (req, res) => {

    try {
        const id = req.params.id

        // Se comprueba que la id sea válid
        if (!id) {
            handleHttpError(res, 'La id es incorrecta', code=400)
            return
        }

        // Se comprueba que el comercio exista
        const commerceExists = await commerce.findOne({ where: { id: id } })
    
        if (!commerceExists) {
            handleHttpError(res, 'El comercio no existe', code=404)
            return
        }
        
        // Se comprueba si el comercio tiene una página web
        const web = await webpage.findOne({ where: { commerceId: id } })

        if (web) {
            // Se elimina la página web
            await webpage.destroy({ where: { commerceId: id } })
        }

        // Se elimina el comercio
        await commerce.destroy({ where: { id: id } })

        return res.status(200).json({ message: 'Comercio eliminado' })
    }
    catch (error) {
        handleHttpError(res, error.message, code=400)
    }
}

module.exports = deleteCommerce
