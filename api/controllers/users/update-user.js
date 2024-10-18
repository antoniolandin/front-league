const { user } = require('../../models')
const { handleHttpError, handleError } = require('../../utils/handleError')

// Función para actualizar a un usuario en la base de datos
updateUser = async (req, res) => {
    try{
        // Obtenemos la id del usuario a actualizar
        const id = req.params.id
        
        // Obtenemos los datos del usuario a actualizar
        const userData = req.body 
        
        // Obtenemos el usuario autenticado
        const userJwt = req.user

        // Comprobamos si el usuario autenticado está autenticado
        if (!userJwt) {
            handleHttpError(res, 'No estás autenticado', 401)
            return
        }

        // Comprobamos si el usuario autenticado es el mismo que el que se quiere eliminar
        if (userJwt.id != id){
            handleHttpError(res, 'No tienes permisos para eliminar este usuario', 403)
            return
        }

        // Buscamos el usuario en la base de datos
        const oldUser = await user.findOne({where: {id: id}})
        
        // Si el usuario no existe, devolvemos un error
        if(!oldUser){
            handleHttpError(res, 'La web no existe', 404)
        }
        else{
            const inmutableFields = [
                'id',
                'createdAt',
                'updatedAt'
            ]

            // Comprobamos que no se estén modificando campos inmutables
            for (const field of inmutableFields){
                if(userData[field] !== undefined && userData[field] !== oldUser[field]){
                    handleHttpError(res, `No se puede modificar el campo ${field}`, 400)
                    return
                }
            }

            // Actualizamos el usuario en la base de datos
            await oldUser.update(userData)

            // Enviamos al cliente la respuesta
            res.status(200).json(oldUser)
        }
    }
    catch(error){
        handleError(res, error, 400)
    }
}

module.exports = updateUser
