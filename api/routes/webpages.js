const express = require('express')
const router = express.Router()
const {
    updateWebpage,
    deleteWebpage,
    getAllWebpages,
    getWebpagesCity,
    getWebpagesCityActivity,
    createWebpage,
    getWebpage,
    createReview
} = require('../controllers/webpages')

const { createReviewValidator, updateWebpageValidator } = require('../validators')
const authMiddleware = require('../middleware/session')
const authMiddlewareMerchant = require('../middleware/sessionMerchant')

// Ruta de crear página web solo para tests
router.post('/', updateWebpageValidator, createWebpage)

// Rutas con validación de autenticación
router.put('/:id', authMiddlewareMerchant, updateWebpageValidator, updateWebpage)
router.delete('/:id', deleteWebpage)

router.get('/', getAllWebpages)
router.get('/search/:city', getWebpagesCity)
router.get('/search/:city/:activity', getWebpagesCityActivity)
router.get('/:id', getWebpage)
router.patch('/:id', authMiddleware, createReviewValidator, createReview)

module.exports = router
