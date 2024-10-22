const { Jugador } = require("../../models")
const handleError = require("../../utils/handleError.js")

const getJugador = async (req, res) => {
    try {
        // obtener la id de los parámetros (https://localhost/api/jugador/id)
        const id_jugador = req.params.id
        
        // si el id no es numérico devolver error
        if(isNan(id)) {
            handleError(res, "La id debe ser numérica", 400)
            return
        }

        // buscar el jugador en la base de datos
        const jugador = await Jugador.findById(id_jugador)
        
        // enviar respuesta al cliente
        if (jugador) {
            res.status(200).json()
        } else {
            handleError(res, 'Jugador no encontrado', 404)
        }
    } catch (error) {
        handleError(res, error, 400)
    }
}

module.exports = getJugador
