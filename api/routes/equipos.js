const express = require('express');
const router = express.Router();
const { postEquipo, getJugadores, getEquipo, getEquipos } = require('../controllers/equipo')

router.post('/', postEquipo)
router.get('/:id/jugadores', getJugadores)
router.get('/:id', getEquipo)
router.get('/', getEquipos)

module.exports = router
