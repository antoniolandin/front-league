const { Equipos } = require("../../models")
const handleError = require("../../utils/handleError.js")

const postEquipo = async (req, res) => {
    try {
        const body = req.body

        console.log(body)
        
        // si el id no es numérico devolver error
        if (!body) {
            handleError(res, "Los datos del equipo están vacíos", 400)
            return
        }
        
        // creamos el jugador en la base de datos
        const data = await Equipos.create(body);
        
        // respondemos con el equipo creado
        res.status(201).json(data)
    } catch (error) {
        console.log(error)
        handleError(res, error, 400)
    }
}

module.exports = postEquipo
