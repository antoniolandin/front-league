const { user } = require('../../models')
const { handleError, handleHttpError } = require('../../utils/handleError.js')

const getUsersCity = async (req, res) => {
    try{
        const city = req.params.city;

        if(!city){
            handleHttpError(res, 'City is required', 400)
            return
        }
        
        // Buscamos los usuarios que tengan la ciudad que se pasó por parámetro y con la opción recibeOffers en true
        const users = await user.findAll({
            where: {
                city: city,
                recibeOffers: true
            }
        })
        
        // Si no se encontraron usuarios, devolvemos un error
        if(!users){
            handleHttpError(res, 'No users found', 404)
            return
        }

        // Le quitamos el campo password a los usuarios
        users.forEach(user => {
            delete user.dataValues.password
        })

        res.status(200).json({users})
    }
    catch(error){
        handleError(res, error, 400)
    }
}

module.exports = getUsersCity

