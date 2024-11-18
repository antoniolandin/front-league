const { Jugadores } = require("../../models")
const handleError = require("../../utils/handleError.js")

const getJugadores = async (req, res) => {
    try {
        // buscamos todos los jugadores de la base de datos
        const result = Jugadores.findAll().then(function (result) {
            if (result.length) {
                res.status(200).json(result)
            }
            else {
                handleError(res, 'No hay jugadores inscritos', 404)
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
