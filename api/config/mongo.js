const mongoose = require('mongoose')

const dbConnect = () => {
    constdb_uri = process.env.MONGO_URI
    mongoose.set('strictQuery', false)

    try {
        mongoose.connect(db_uri)
        console.log('MongoDB connected')
    } catch (err) {
        console.log(err)
    }

    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected')
    })
}

module.exports = dbConnect
