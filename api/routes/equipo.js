const express = require('express');
const router = express.Router();
const { postEquipo, getJugadores } = require('../controllers/equipo')

router.post('/', postEquipo)
router.get('/:id/jugadores', getJugadores)

module.exports = router
