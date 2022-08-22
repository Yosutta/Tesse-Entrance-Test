const { ReasonPhrases, StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userModel = require('../models/user.model')

// Get current user profile info
module.exports = {
    getUserProfile: async (req, res) => {
        try {
            const token = req.token
            const foundCurrentUser = await userModel.findOne({
                _id: token.userId,
            })
            const userData = {
                username: foundCurrentUser.username,
                fullName: foundCurrentUser.fullName,
                avatar: foundCurrentUser.avatar,
                role: foundCurrentUser.role,
            }
            res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                data: { currenUser: userData },
            })
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: err,
            })
        }
    },
    // Create new user
    signUpUser: async (req, res) => {
        try {
            const { username, password, fullName, avatar } = req.body
            const foundUser = await userModel.findOne({ username: username })
            if (!foundUser) {
                const saltRounds = 10
                const passwordHash = await bcrypt.hash(password, saltRounds)
                const newUser = new userModel({
                    username,
                    passwordHash,
                    fullName,
                    avatar,
                })
                await newUser.save()
                res.status(StatusCodes.OK).json({
                    status: StatusCodes.OK,
                    message: 'New user created',
                })
            } else {
                res.status(StatusCodes.CONFLICT).json({
                    status: StatusCodes.CONFLICT,
                    message:
                        'This username existed, can not create accounts with duplicated username',
                })
            }
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: err,
            })
        }
    },
    // User signin
    signInUser: async (req, res) => {
        try {
            const { username, password } = req.body
            const foundUser = await userModel.findOne({ username: username })

            if (!foundUser) {
                res.status(StatusCodes.NOT_FOUND).json({
                    status: StatusCodes.NOT_FOUND,
                    message: 'User not found.',
                })
            } else {
                bcrypt.compare(
                    password,
                    foundUser.passwordHash,
                    (err, result) => {
                        if (result) {
                            const payload = {
                                userId: foundUser._id,
                                role: foundUser.role,
                            }
                            const secret =
                                process.env.JWT_SECRET_KEY ||
                                'thisisatemporarysecret'
                            const token = jwt.sign(payload, secret, {
                                expiresIn: '1h',
                            })
                            res.status(StatusCodes.OK).json({
                                status: StatusCodes.OK,
                                data: {
                                    token,
                                },
                            })
                        } else {
                            res.status(StatusCodes.UNAUTHORIZED).json({
                                status: StatusCodes.UNAUTHORIZED,
                                message: 'Incorrect username or password',
                            })
                        }
                    }
                )
                // if(foundUser.passwordHash !== password){
                //     res.status(StatusCodes.UNAUTHORIZED)
                //     .json({
                //         status: StatusCodes.UNAUTHORIZED,
                //         message: "Incorrect username or password"
                //     })
                // }
                // else{
                //     const payload = {
                //         userId : foundUser._id,
                //         role: foundUser.role
                //     }
                //     const token = jwt.sign(payload, 'thisisabadsecret', {expiresIn: '1h'})
                //     res.status(StatusCodes.OK)
                //     .json({
                //         status: StatusCodes.OK,
                //         data: {
                //             token
                //         }
                //     })
                // }
            }
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: err,
            })
        }
    },
    // Edit user info
    editUserProfile: async (req, res) => {
        try {
            const token = req.token
            const foundCurrentUser = await userModel.findById(token.userId)

            if (foundCurrentUser) {
                const { username, oldpassword, newpassword, fullName, avatar } =
                    req.body
                bcrypt.compare(
                    oldpassword,
                    foundCurrentUser.passwordHash,
                    async (err, result) => {
                        if (result) {
                            const saltRounds = 10
                            const passwordHash = await bcrypt.hash(
                                newpassword,
                                saltRounds
                            )
                            await userModel.findByIdAndUpdate(
                                foundCurrentUser._id,
                                {
                                    username,
                                    passwordHash,
                                    fullName,
                                    avatar,
                                }
                            )
                            res.status(StatusCodes.OK).json({
                                status: StatusCodes.OK,
                                message: 'User edited successfully',
                            })
                        } else {
                            res.status(StatusCodes.UNAUTHORIZED).json({
                                status: StatusCodes.UNAUTHORIZED,
                                message: 'Current password does not match',
                            })
                        }
                    }
                )
                // if(foundCurrentUser.password === oldpassword){
                //     await userModel.findByIdAndUpdate(foundCurrentUser._id, {
                //         username,
                //         password:newpassword,
                //         fullName,
                //         avatar
                //     })
                //     res.status(StatusCodes.OK)
                //     .json({
                //         status: StatusCodes.OK,
                //         message: 'User edited successfully'
                //     })
                // }
                // else {
                //     res.status(StatusCodes.OK)
                //     .json({
                //         status:StatusCodes.OK,
                //         message: "Current password does not match"
                //     })
                // }
            } else {
                res.status(StatusCodes.NOT_FOUND).json({
                    status: StatusCodes.NOT_FOUND,
                    message: 'Logged in user not found.',
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
// module.exports = {getUserProfile, signUpUser, signInUser, editUserProfile}
