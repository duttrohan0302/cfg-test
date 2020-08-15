//Import Model
const User = require('./../models/User')


//Create user
exports.register = async function (newUser) {
    try {
        const user = await User.create({name: newUser.name, email: newUser.email, phone: newUser.phone, password: newUser.password})
        const createdUser = {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
        }
        return createdUser;
    } catch (e) {
        return e
    }
}





//Get all users
exports.getAll = async function () {
    try {
        const users = await User.find({},{name:1,email:1, phone:1})
      
        return users;
    } catch (e) {
        return e
    }
}

exports.update = async function(userId,updateUser){
    try{
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                name:updateUser.name,
                email:updateUser.email,
                phone:updateUser.phone
            },{
                "fields": { "password":0},
                new:true
            }
        )
        return updatedUser
    }
    catch(errors) {
        return errors;
    }
} 


//Service to check if user already exist
exports.findOne = async function(email) {

    let user = await User.findOne({email: email})

    if(user){
        console.log("Service=> Email already exists");
    }
    else{
        console.log("Service=>user doesn't exist")
    }

    return user
}

// Delete a user
exports.delete = async function(id) {
    try{
        let response = await User.findByIdAndDelete(id);

        const user = {
            id: response._id,
            name: response.name,
            email: response.email,
            phone: response.phone
        }
        return user;
        
    } catch(errors) {
        return errors
    }
}