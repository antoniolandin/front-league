const { webpage } = require('../../models')
const { handleError } = require('../../utils/handleError')

const createWebpage = async (req, res) => {
    try {
        // Creamos la página web en la base de datos
        const webpageData = await webpage.create(req.body)
        
        // Respondemos con la página web creada
        res.status(201).json(webpageData)
    }
    catch (error) {
        handleError(res, error, 400)
    }
}

module.exports = createWebpage
