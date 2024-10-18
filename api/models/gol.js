const mongoose = require('mongoose')

const GolSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    jugador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jugador',
        required: true,
    },
    equipo_gol_a_favor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipo',
        required: true,
    }
},
{
    timestamps: true,
    versionKey: false,
})

module.exports = mongoose.model('Gol', GolSchema)
