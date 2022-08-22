const express = require('express')
const app = express()
const { StatusCodes } = require('http-status-codes')

app.use((req, res, next) => {
    const token = req.token
    const role = token.role

    if (role !== 'admin') {
        res.status(StatusCodes.FORBIDDEN).json({
            status: StatusCodes.FORBIDDEN,
            message: 'User can not access this type of content',
        })
    } else {
        next()
    }
})

module.exports = app
