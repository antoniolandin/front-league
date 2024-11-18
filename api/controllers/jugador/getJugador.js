const { Jugadores } = require("../../models")
const handleError = require("../../utils/handleError.js")

const getJugador = async (req, res) => {
    try {
        // obtener la id de los parámetros (https://localhost/api/jugador/id)
        const id_jugador = req.params.id
        
        // si el id no es numérico devolver error
        if (isNaN(id_jugador)) {
            handleError(res, "La id debe ser numérica", 400)
            return
        }

        // buscar el jugador en la base de datos
        const result = Jugadores.findOne({where: {id: id_jugador}}).then(function (result) {
            if (result) {
                res.status(200).json(result)
            }
            else {
                handleError(res, 'Jugador no encontrado', 404)
            }
        }).catch(function (err) {
            handleError(res, err, 400)
        })
    } catch (error) {
        console.log(error)
        handleError(res, error, 400)
    }
}

module.exports = getJugador
