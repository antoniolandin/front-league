const express = require('express')
const cors = require('cors')
require('dotenv').config()
const morganBody = require('morgan-body')
const loggerStream = require('./utils/handleLogger')
const swaggerUi = require('swagger-ui-express')
const swaggerSpecs = require('./docs/swagger')

// Creamos la aplicación express
const app = express()

// Configuramos morgan para que envíe los logs a slack
morganBody(app, {
    noColors: true,
    skip: (req, res) => {
        return res.statusCode < 400
    },
    stream: loggerStream
})

// Le decimos a la aplicación que user cors para evitar el error Corss-Domain (XD)
app.use(cors())
app.use(express.json())

// Configuramos swagger
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpecs)
)

// Rutas
app.use('/api', require('./routes'))

// Exportamos la aplicación para usarla en otros archivos
module.exports = app
