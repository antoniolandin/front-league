const mongoose = require('mongoose')

const EquipoScheme = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    nombre: {
        type: String
        required: true,
    },
    partidos_jugados: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partido',
    },
    victorias: Number,
    empates: Number,
    jugadores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jugador',
        required: true,
    }],
    derrotas: Number,
    goles_a_favor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gol',
    }],
    goles_en_contra: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gol',
    }],
    puntos: Number,
},
{
    timestamps: true,
    versionKey: false,
})

module.exports = mongoose.model('Equipos', EquiposScheme)
