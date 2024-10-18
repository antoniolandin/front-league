const { webpage } = require('../../models')
const { handleHttpError } = require('../../utils/handleError')

const getWebpage = async (req, res) => {
    try {

        // Obtenemos el id de la página web
        const id = req.params.id

        // Comprobamos que el id sea un número
        if (isNaN(id)) {
            handleHttpError(res, 'El id no es un número', 400)
            return
        }
        
        // Buscamos la página web por su id
        const webpageData = await webpage.findByPk(id)
        
        // Enviamos la página web
        res.status(200).json(webpageData)
        
    } catch (error) {
        handleHttpError(res, error, 400)
    }
}

module.exports = getWebpage
