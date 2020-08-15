//Import Required Libraries
const express = require('express')
const router = express.Router()

//Import controller
const UserController = require('../controllers/users')

//Import and require Passport
const passport = require("passport");
require("./../middlewares/passport")(passport);

//Login route
router.post('/login',UserController.login);

//Create User Route
router.post('/register', UserController.register);

//Get all users in database
router.get('/users', UserController.getAll);

// Get the current user detail
// To check the user auth
router.get('/user/current', passport.authenticate("jwt",{session:false}), UserController.getCurrent)

// Update a user's details
router.patch('/user',passport.authenticate("jwt",{session:false}), UserController.update);

// Delete a user
router.delete('/user',passport.authenticate("jwt",{session:false}), UserController.delete); 


//Export User Route
module.exports = router