const { Jugadores } = require("../../models")
const handleError = require("../../utils/handleError.js")

const postJugador = async (req, res) => {
    try {
        const body = req.body

        console.log(body)
        
        // si el id no es numérico devolver error
        if (!body) {
            handleError(res, "Los datos del jugador están vacíos", 400)
            return
        }
        
        // creamos el jugador en la base de datos
        const data = await Jugadores.create(body);
        
        // respondemos con el jugador creado
        res.status(201).json(data)
    } catch (error) {
        console.log(error)
        handleError(res, error, 400)
    }
}

module.exports = postJugador
