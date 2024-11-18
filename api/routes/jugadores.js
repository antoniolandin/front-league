const express = require('express');
const router = express.Router();
const { getJugador, getJugadores, postJugador } = require('../controllers/jugador')

router.get('/', getJugadores)
router.get('/:id', getJugador)
router.post('/', postJugador)

module.exports = router
