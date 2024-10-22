const mongoose = require('mongoose')

const dbConnect = () => {
    // Obtener variables de entorno
    const db_host = process.env.DB_HOST
    const db_name = process.env.DB_NAME
    const db_port = process.env.DB_PORT

    if (!db_host || !db_name || !db_port) {
        console.log('Error: no se han encontrado las variables de entorno. Crea el fichero .env en la raíz del proyecto')
    }

    const mongodb_uri = `mongodb://${db_host}:${db_port}/${db_name}`

    mongoose.set('strictQuery', false)
    
    console.log(`Conectando con la base de datos ${db_name} en el puerto ${db_port}`)

    try {
        mongoose.connect(mongodb_uri).then(res => {
            if (res) {
                console.log(`Conexión con la base de datos ${db_name} exitosa`)
            }
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = dbConnect
