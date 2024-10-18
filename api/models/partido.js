const mongoose = require('mongoose')

const PartidoSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    fecha_partido: {
        type: Date,
        required: true,
    },
    equipo_local: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipo',
        required: true,
    },
    jugadores_local: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jugador',
        required: true,
    }],
    equipo_visitante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipo',
        required: true,
    },
    jugadores_visitante: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jugador',
        required: true,
    }],
    goles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gol'
    }]
},
{
    timestamps: true,
    versionKey: false,
})

module.exports = mongoose.model('Partido', PartidoSchema)
