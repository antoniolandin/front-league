const { webpage } = require('../../models')
const { handleHttpError } = require('../../utils/handleError')

const getCommercesCityActivity = async (req, res) => {
    try {
        const city = req.params.city 
        const activity = req.parmas.activity

        const asc = req.query.asc
        
        if (asc === 'true' || asc === 'false') {
            const ascBool = asc === 'true'

            const webpagesCity = await webpage.findAll({
                where: { city: city, activity: activity},
                order: [
                    ['scoring', ascBool ? 'ASC' : 'DESC']
                ]
            })

            res.status(200).json(webpagesCity)
        }
        else {
            const webpagesCity = await webpage.findAll({
                where: { city: city, activity: activity}
            })

            res.status(200).json(webpagesCity)
        }

    } catch (error) {
        handleHttpError(res, error, 400)
    }
}

module.exports = getCommercesCityActivity
