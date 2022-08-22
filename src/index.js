const express = require('express')
const app = express()
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const path = require('path')
const swaggerDocPath = path.resolve(__dirname, './swagger.yaml')
const swaggerDocument = YAML.load(swaggerDocPath)
require('dotenv').config()

const userRouter = require('./routes/user.route')
const adminRouter = require('./routes/admin.route')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Add headers before the routes are defined
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888')

    // Request methods you wish to allow
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    )

    // Request headers you wish to allow
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type'
    )

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)

    res.setHeader('Access-Control-Allow-Origin', '*')
    // Pass to next layer of middleware
    next()
})

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use('/user', userRouter)
app.use('/admin', adminRouter)

app.get('*', (req, res) => {
    res.send('Unexisting route')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
