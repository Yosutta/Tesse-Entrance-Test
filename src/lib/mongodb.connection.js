const mongoose = require('mongoose')

const conn = mongoose.createConnection(
    'mongodb://127.0.0.1:27017/tesse-backend-database'
)

module.exports = conn
