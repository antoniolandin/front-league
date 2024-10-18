const mongoose = require('mongoose')

const EquiposScheme = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
    },
    nombre: String,
    partidos_jugados: Number,
    victorias: Number,
    empates: Number,
    derrotas: Number,
    goles_a_favor: Number,
    goles_en_contra: Number,
    puntos: Number,
},
{
    timestamps: true,
    versionKey: false,
})

module.exports = mongoose.model('Equipos', EquiposScheme)
