const express = require('express');
const router = express.Router();
const { getJugador, postJugador } = require('../controllers/jugador')

router.get('/:id', getJugador)
router.post('/', postJugador)

module.exports = router
