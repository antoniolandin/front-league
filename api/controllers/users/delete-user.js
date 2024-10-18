const { user } = require('../../models')
const { handleHttpError, handleError } = require('../../utils/handleError')

// Función para eliminar un usuario
deleteUser = async (req, res) => {
    try{
        // Obtenemos el id del usuario a eliminar
        const id = req.params.id
        
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

        // Buscamos el usuario a eliminar
        const userExists = await user.findByPk(id)
        
        // Comprobamos si el usuario existe
        if (!userExists) {
            handleHttpError(res, 'Usuario no encontrado', 404)
            return
        }

        // Eliminamos el usuario
        await user.destroy({
            where: {
                id: id
            }
        })

        res.status(200).json({
            message: 'Usuario eliminado'
        })

    } catch (error) {
        handleError(res, error, 400)
    }
}

module.exports = deleteUser
