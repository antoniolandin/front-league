const express = require('express')
const cors = require('cors')
require('dotenv').config()

// Creamos la aplicación express
const app = express()

// Le decimos a la aplicación que user cors para evitar el error Corss-Domain (XD)
app.use(cors())
app.use(express.json())

// Rutas
app.use('/api', require('./routes'))

// Puerto abierto para backend
const port = process.env.PORT || 3500

// Escuchamos el puerto
app.listen(port, () => {
    console.log('Server running on port ' + port)
})

// Exportamos la aplicación para usarla en otros archivos
module.exports = app
