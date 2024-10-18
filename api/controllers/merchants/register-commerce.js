const { commerce } = require('../../models')
const { handleError } = require('../../utils/handleError')
const { tokenSignMerchant } = require('../../utils/handleJwt')

// Función para registrar un comercio en la base de datos
const registerCommerce = async (req, res) => {
    try {
        // Creamos al comercio en la base de datos
        const commerceData = await commerce.create(req.body)

        // Creamos la página web del comercio en la base de datos
        await commerceData.createWebpage({})

        // Obtenemos la página web del comercio
        const webpage = await commerceData.getWebpage()
        
        // Creamos el token del comercio
        const tokenData = {
            id: commerceData.id,
            webpageId: webpage.id,
        }

        // Creamos la respuesta que enviaremos al cliente
        const data = {
            token: tokenSignMerchant(tokenData),
            commerce: commerceData,
            webpage: webpage,
        }
        
        // Enviamos al cliente el token y los datos del comercio
        res.status(201).json(data)
    }
    catch (error) {
        // Enviamos al cliente un mensaje de error
        handleError(res, error, 400)
    } 
}

module.exports = registerCommerce
