const express = require('express')
const app = express()
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')
require('dotenv').config()

const userRouter = require('./routes/user.route')
const adminRouter = require('./routes/admin.route')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use('/user', userRouter)
app.use('/admin', adminRouter)

app.get('*', (req, res) => {
    res.send('Unexisting route')
})

app.listen('3000', () => {
    console.log('Listening on port 3000')
})
