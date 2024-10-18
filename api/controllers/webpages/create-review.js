const { webpage, review } = require('../../models')
const { handleError, handleHttpError } = require('../../utils/handleError')

const createReview = async (req, res) => {
    try {
        // Recogemos el id de la página de la url        
        const webpageId = req.params.id

        // Buscamos la página en la base de datos
        const web = await webpage.findByPk(webpageId)

        // Si no existe la página, devolvemos un error
        if (!web) {
            handleHttpError(res, 'Página no encontrada', 404)
        }

        // Creamos la review
        const data = await web.createReview(req.body)

        // Buscamos el número de reviews
        const count = await web.countReviews()

        // Buscamos todas las reviews de la página
        const reviews = await review.findAll({ where: { webpageId } })

        // Calculamos la media de las reviews
        const total = await reviews.reduce((acc, review) => acc + review.rating, 0)

        // Actualizamos la media de la página
        web.scoring = total / reviews.length

        // Actualizamos el número de reviews
        web.numReviews = count

        // Guardamos los cambios
        web.save()

        // Enviamos la respuesta
        res.status(201).json(data)

    } catch (error) {
        handleError(res, error, 400)
    }
}

module.exports = createReview
