const updateWebpage = require('./update-webpage')
const deleteWebpage = require('./delete-webpage')
const getAllWebpages = require('./get-all-webpages')
const getWebpagesCity = require('./get-webpages-city')
const getWebpagesCityActivity = require('./get-webpages-city-activity')
const createWebpage = require('./create-webpage')
const getWebpage = require('./get-webpage')
const createReview = require('./create-review')

module.exports = {
    updateWebpage,
    deleteWebpage,
    getAllWebpages,
    getWebpagesCity,
    createWebpage,
    getWebpage,
    createReview,
    getWebpagesCityActivity
}
