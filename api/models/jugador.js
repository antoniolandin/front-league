const mongoose = require('mongoose')

const JugadorSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
    },
    id_equipo: Number,
    nombre: String,
    primer_apellido: String,
    segundo_apellido: String,
    grado: String,
    curso: Number,
    goles: Number,
    numero_partidos_jugados: Number,
},
{
    timestamps: true,
    versionKey: false,
})

module.exports = mongoose.model('Jugador', JugadorSchema)
