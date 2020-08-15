// Import bcryptjs and JsonWebToken
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Import validations
const validateRegisterInput = require('./../validations/register')
const validateLoginInput = require('./../validations/login')

const { secretOrKey } = require('../config')

// Import User Services
const UserService = require('./../services/users');
const User = require("../models/User");

//Create user
exports.register = async function(req,res, next) {
    const { errors, isValid } = validateRegisterInput(req.body)
    if(!isValid) {
        return res.status(400).json(errors);
    }
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    }


    try {
        const user = await UserService.findOne(newUser.email)
        if(!user) {
            newUser.password = await hashPassword(newUser.password); 
            const createdUser = await UserService.register(newUser)
            return res.status(200).json(createdUser)
        }
        errors.email = "Email already exists, please login";

        res.status(409).json(errors)
    } catch (errors) {
        return res.status(400).json(errors);
    }
}


//Login controller
exports.login = async function(req, res, next) {
    const { errors, isValid } = validateLoginInput(req.body)
    if(!isValid) {
        return res.status(400).json(errors);
    }
    const { email, password } = req.body;
    try {
        const user = await UserService.findOne(email);

        if(!user) {
            errors.email= "User not found";
            return res.status(404).json(errors)
        }

        // Check password
        const isSame = await compare(password, user.password);

        if(isSame){
            // Password matched, create payload
            const payload = { id: user.id, name: user.name, email:user.email, phone:user.phone }; //Create JWT Payload
            // Sign token
            jwt.sign(
                payload,
                secretOrKey,
                { expiresIn: 86400 },
                (err, token) => {
                return res.status(200).json({
                    success: true,
                    token: "Bearer " + token,
                });
                }
            );
        } else {
            errors.password = "Password Incorrect";
            return res.status(401).json(errors);
        }
    } catch (errors) {
        res.status(400).json(errors);
    }
}


//Get all users controller
exports.getAll = async function(req,res, next) {
    try {
        const users = await UserService.getAll()
        const data = {
                count: users.length,
                users: users
            }
 
        return res.status(200).json(data)
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message});
    }
}

exports.update = async function (req,res,next) {
    try{
        const id = req.user.id;
        const updateUser = {
            name: req.body.name ? req.body.name : req.user.name,
            email: req.body.email ? req.body.email : req.user.email,
            phone: req.body.phone ? req.body.phone : req.user.phone
        }

        const updatedUser = await UserService.update(id,updateUser)

        return res.status(200).json(updatedUser)
    }
    catch(errors){
        return res.status(400).json(errors)
    }
}

// Get the current user details controller
exports.getCurrent = function(req,res,next) {
    try{
        return res.status(200).json({
            id:req.user.id,
            name: req.user.name,
            email: req.user.email,
            phone: req.user.phone
        })
    } catch (errors) {
        return res.status(400).json(errors);
    }
}

// Delete a user
exports.delete = async function(req,res, next) {
    try {
        const users = await UserService.delete(req.user.id)

        return res.status(200).json({message: 'User Deleted', data: users})
 
    } catch (errors) {
        return res.status(400).json(errors);
    }
}

//Function to hash Password
async function hashPassword (password) {
    
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, 12, function(err, hash) {
        if (err) reject(err)
        resolve(hash)
      });
    })
  
    return hashedPassword
}

//Compare password
async function compare (password1, password2) {

    const isSame = await new Promise((resolve, reject) => {
        bcrypt.compare(password1, password2, function(err, result) {
            if(err) reject(err)
            resolve(result)
        })
    })

    return isSame;
}