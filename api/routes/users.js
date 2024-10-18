const express = require('express');
const router = express.Router();
const { getUsersCity, deleteUser, updateUser } = require('../controllers/users')
const { updateUserValidator } = require('../validators')
const authMiddleware = require('../middleware/session');
const authMiddlewareMerchant = require('../middleware/sessionMerchant');

router.delete('/:id', authMiddleware, deleteUser)
router.put('/:id', authMiddleware, updateUserValidator, updateUser)
router.get('/:city', authMiddlewareMerchant, getUsersCity)

module.exports = router
