const mongoose = require('mongoose')

const dbConnect = () => {
    const db_uri = process.env.MONGO_URI
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
