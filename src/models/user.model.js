const mongoose = require('mongoose')
const conn = require('../lib/mongodb.connection')
const fs = require('fs')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        default: '',
    },
    avatar: {
        type: String,
        default: '',
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
})

const userModel = conn.model('User', userSchema)

async function addInitialAdminData() {
    const existIntialData = await userModel.count()
    if (!existIntialData) {
        fs.readFile('./admin-account.json', 'utf-8', async (err, data) => {
            if (err) throw err

            const json = JSON.parse(data)
            for (let i = 0; i < json.length; i++) {
                const saltRounds = 10
                const passwordHash = await bcrypt.hash(
                    json[i].password,
                    saltRounds
                )
                const role = 'admin'
                const newAdmin = new userModel({
                    username: json[i].username,
                    passwordHash,
                    fullName: json[i].fullName,
                    role,
                })
                await newAdmin.save()
            }
        })
    }
}
addInitialAdminData()

module.exports = userModel
