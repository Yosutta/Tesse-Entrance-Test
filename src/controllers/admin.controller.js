const express = require('express')
const router = express.Router()
const { StatusCodes } = require('http-status-codes')
const bcrypt = require('bcrypt')

const userModel = require('../models/user.model')

module.exports = {
    adminCreateUserProfile: async (req, res) => {
        try {
            const { username, password, fullName, avatar, role } = req.body
            const foundUser = await userModel.findOne({ username: username })
            if (!foundUser) {
                const saltRounds = 10
                const passwordHash = await bcrypt.hash(password, saltRounds)
                const newUser = new userModel({
                    username,
                    passwordHash,
                    fullName,
                    avatar,
                    role,
                })
                await newUser.save()

                res.status(StatusCodes.OK).json({
                    status: StatusCodes.OK,
                    message: 'Admin created a new user',
                    data: {
                        user: newUser,
                    },
                })
            } else {
                res.status(StatusCodes.OK).json({
                    status: StatusCodes.OK,
                    message:
                        'Username existed, can not create accounts with duplicated username',
                })
            }
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: err,
            })
        }
    },
    adminReadAllUserProfile: async (req, res) => {
        try {
            const userList = await userModel.find()
            if (userList.length) {
                res.status(StatusCodes.OK).json({
                    status: StatusCodes.OK,
                    data: {
                        usersDataList: userList,
                    },
                })
            } else {
                res.status(StatusCodes.NOT_FOUND).json({
                    status: StatusCodes.NOT_FOUND,
                    message: 'User list is empty',
                })
            }
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: err,
            })
        }
    },
    adminReadUserProfile: async (req, res) => {
        try {
            const id = req.params['id']
            const foundUser = await userModel.findById(id)
            if (!foundUser) {
                res.status(StatusCodes.NOT_FOUND).json({
                    status: StatusCodes.NOT_FOUND,
                    message: 'User account not found',
                })
            } else {
                res.status(StatusCodes.OK).json({
                    status: StatusCodes.OK,
                    data: {
                        user: foundUser,
                    },
                })
            }
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: err,
            })
        }
    },
    adminUpdateUserProfile: async (req, res) => {
        try {
            const id = req.params['id']
            const foundUser = await userModel.findById(id)
            if (foundUser) {
                const { username, password, fullName, avatar, role } = req.body
                const saltRounds = 10
                const passwordHash = await bcrypt.hash(password, saltRounds)
                const updatedUser = await userModel.findByIdAndUpdate(id, {
                    username,
                    passwordHash,
                    fullName,
                    avatar,
                    role,
                })
                res.status(StatusCodes.OK).json({
                    status: StatusCodes.OK,
                    message: 'User edited successfully',
                    data: {
                        updatedUser,
                    },
                })
            } else {
                res.status(StatusCodes.NOT_FOUND).json({
                    status: StatusCodes.NOT_FOUND,
                    message: 'User account not found',
                })
            }
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: err,
            })
        }
    },
    adminDeleteUserProfile: async (req, res) => {
        try {
            const id = req.params['id']
            const foundUser = await userModel.findById(id)
            if (foundUser) {
                await userModel.findByIdAndDelete(id)
                res.status(StatusCodes.OK).json({
                    status: StatusCodes.OK,
                    message: 'User account deleted',
                })
            } else {
                res.status(StatusCodes.NOT_FOUND).json({
                    status: StatusCodes.NOT_FOUND,
                    message: 'User account not found',
                })
            }
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: err,
            })
        }
    },
}
