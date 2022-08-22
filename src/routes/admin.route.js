const express = require('express')
const {
    adminCreateUserProfile,
    adminReadAllUserProfile,
    adminReadUserProfile,
    adminUpdateUserProfile,
    adminDeleteUserProfile,
} = require('../controllers/admin.controller')
const adminRouter = express.Router()

const adminMiddleware = require('../middleware/admin.middleware')
const JWTMiddleware = require('../middleware/jwt.middleware')

// Creating new user
adminRouter
    .route('/user')
    .get(JWTMiddleware, adminMiddleware, adminReadAllUserProfile)
    .post(JWTMiddleware, adminMiddleware, adminCreateUserProfile)
adminRouter
    .route('/user/:id')
    .get(JWTMiddleware, adminMiddleware, adminReadUserProfile) // Read user profile
    .put(JWTMiddleware, adminMiddleware, adminUpdateUserProfile) // Update user profile
    .delete(JWTMiddleware, adminMiddleware, adminDeleteUserProfile) // Delete user profile

module.exports = adminRouter
