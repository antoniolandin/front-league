const { Jugadores, Equipos } = require("../../models")
const handleError = require("../../utils/handleError.js")

const getJugadores = async (req, res) => {
    try {
        // obtener la id de los parámetros (https://localhost/api/jugador/id)
        const id_equipo = req.params.id
        
        // si el id no es numérico devolver error
        if (isNaN(id_equipo)) {
            handleError(res, "La id debe ser numérica", 400)
            return
        }

        // comprobar que el equipo existe
        const equipo = await Equipos.findOne({where: {id: id_equipo}})
        
        // si no existe el equipo, mandar un error
        if (!equipo) {
            handleError(res, 'El equipo no existe', 404)
            return
        }

        // buscar el jugador en la base de datos
        const result = Jugadores.findAll({where: {id_equipo: id_equipo}}).then(function (result) {
            if (result.length) {
                res.status(200).json(result)
            }
            else {
                handleError(res, `El equipo ${equipo.nombre} no tiene jugadores`, 404)
            }
        }).catch(function (err) {
            handleError(res, err, 400)
        })
    } catch (error) {
        console.log(error)
        handleError(res, error, 400)
    }
}

module.exports = getJugadores
