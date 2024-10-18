const app = require('./app')
const colors = require('colors')

// El puerto es obtenido desde las variables de entorno, si no existe, se usa el puerto 3000
const port = process.env.PORT ?? 3000

// Escuchamos en el puerto
app.listen(port, () => {
    console.log("Servidor escuchando en el puerto ".magenta + port.toString().yellow)
})
