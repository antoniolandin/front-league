const express = require('express');
const router = express.Router();
const { postEquipo } = require('../controllers/equipo')

router.post('/', postEquipo)

module.exports = router
