const mongoose = require('mongoose')
const MONGO_URI =
    process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tesse-backend-database'

const conn = mongoose.createConnection(MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
})

module.exports = conn
