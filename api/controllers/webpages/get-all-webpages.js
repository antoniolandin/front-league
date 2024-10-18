const { webpage } = require('../../models')
const { handleError } = require('../../utils/handleError')

const getAllWebpages = async (req, res) => {
  try {
    const allwebpages = await webpage.findAll()
    res.status(200).json(allwebpages)
  } catch (error) {
    handleError(res, error, 400)
  }
}

module.exports = getAllWebpages
