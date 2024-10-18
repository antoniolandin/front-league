const { commerce } = require('../../models')
const { handleError } = require('../../utils/handleError')

const getAllCommerces = async (req, res) => {
  try {
    const allCommerces = await commerce.findAll()
    res.status(200).json(allCommerces)
  } catch (error) {
    handleError(res, error, 400)
  }
}

module.exports = getAllCommerces
