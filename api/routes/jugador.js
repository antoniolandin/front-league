const express = require('express');
const router = express.Router();
const { getJugador } = require('../controllers/jugador')

router.get('/:id', getJugador)

module.exports = router
