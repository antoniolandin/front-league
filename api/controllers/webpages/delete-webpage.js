const { webpage } = require('../../models')
const { handleHttpError } = require('../../utils/handleError')

// Función para darse de baja de la web
deleteWebpage = async (req, res) => {

    try {
        const id = req.params.id

        // Se comprueba que la id sea válid
        if (!id) {
            handleHttpError(res, 'La id es incorrecta', code=400)
            return
        }

        // Se comprueba que la web exista
        const webpageExists = await webpage.findOne({ where: { id: id } })

        if (!webpageExists) {
            handleHttpError(res, 'La web no existe', code=404)
            return
        }

        // Se elimina la web
        await webpage.destroy({ where: { id: id } })

        return res.status(200).json({ message: 'Web eliminada' })
    }
    catch (error) {
        handleHttpError(res, error.message, code=400)
    }
}

module.exports = deleteWebpage
