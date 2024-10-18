const { webpage } = require('../../models')
const { handleHttpError, handleError } = require('../../utils/handleError')

// Función para actualizar una web en la base de datos
updateWebpage = async (req, res) => {
    try{
        // Obtenemos la id del comercio a modificar
        const id = req.params.id

        if(!id){
            handleHttpError(res, 'Falta la id del comercio', 400)
            return
        }

        // Obtenemos la id de la página a modificar desde el jwt
        const webpageId = req.webpageId
        
        // Si no se ha obtenido la id de la página, devolvemos un error
        if(!webpageId){
            handleHttpError(res, 'No tiene permisos para modificar esta página', 403)
            return
        }

        // Si la id de la página no coincide con la id de la web a modificar, devolvemos un error
        if (webpageId != id){
            handleHttpError(res, 'No tiene permisos para modificar esta página', 403)
            return
        }
        
        // Obtenemos los datos de la web a modificar
        const webpageData = req.body 

        // Buscamos la web en la base de datos
        const oldWebpage = await webpage.findOne({where: {id: id}})
        
        // Si la web no existe, devolvemos un error
        if(!oldWebpage){
            handleHttpError(res, 'La web no existe', 404)
        }
        else{
            const inmutableFields = [
                'id',
                'createdAt',
                'updatedAt',
                'numReviews',
                'scoring'
            ]

            // Comprobamos que no se estén modificando campos inmutables
            for (const field of inmutableFields){
                if(webpageData[field] !== undefined && webpageData[field] !== oldWebpage[field]){
                    handleHttpError(res, `No se puede modificar el campo ${field}`, 400)
                    return
                }
            }

            // Actualizamos la web
            const data = await oldWebpage.update(webpageData)

            // Enviamos al cliente la respuesta
            res.status(200).json(data)
        }
    }
    catch(error){
        handleError(res, error, 400)
    }
}

module.exports = updateWebpage
