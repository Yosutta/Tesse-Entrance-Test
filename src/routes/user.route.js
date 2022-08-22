const express = require('express')
const {
    getUserProfile,
    signUpUser,
    signInUser,
    editUserProfile,
} = require('../controllers/user.controller')
const userRouter = express.Router()

const JWTMiddleware = require('../middleware/jwt.middleware')

userRouter.get('/', JWTMiddleware, getUserProfile) // Get current user profile info
userRouter.post('/signup', signUpUser) // Create new user
userRouter.post('/signin', signInUser) // User signin
userRouter.put('/', JWTMiddleware, editUserProfile) // Edit user info

module.exports = userRouter
