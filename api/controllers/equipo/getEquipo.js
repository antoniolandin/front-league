const { Equipos } = require("../../models")
const handleError = require("../../utils/handleError.js")

const getEquipo = async (req, res) => {
    try {
        // obtener la id de los parámetros (https://localhost/api/jugador/id)
        const id_equipo = req.params.id
        
        // si el id no es numérico devolver error
        if (isNaN(id_equipo)) {
            handleError(res, "La id debe ser numérica", 400)
            return
        }

        // buscar el equipo en la base de datos
        const result = Equipos.findOne({where: {id: id_equipo}}).then(function (result) {
            if (result) {
                res.status(200).json(result)
            }
            else {
                handleError(res, 'Equipo no encontrado', 404)
            }
        }).catch(function (err) {
            handleError(res, err, 400)
        })
    } catch (error) {
        console.log(error)
        handleError(res, error, 400)
    }
}

module.exports = getEquipo
