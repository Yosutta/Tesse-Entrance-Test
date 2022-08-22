const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')

app.use((req, res, next) => {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const token = bearerHeader.split(' ')[1]
        try {
            const secret =
                process.env.JWT_SECRET_KEY || 'thisisatemporarysecret'
            const payload = jwt.verify(token, secret)
            // console.log(payload)
            req.token = payload
            next()
        } catch (err) {
            res.status(StatusCodes.FORBIDDEN).json({
                status: StatusCodes.FORBIDDEN,
                messsage: err,
            })
        }
    } else {
        res.status(StatusCodes.FORBIDDEN).json({
            status: StatusCodes.FORBIDDEN,
            messsage: 'No account logged in',
        })
    }
})

module.exports = app
