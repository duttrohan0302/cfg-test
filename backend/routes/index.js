const routes = require('express').Router()


//Import all routes
const userRoutes = require('./user')


//Combine routes
routes.use(userRoutes)



//Export all routes
module.exports = routes