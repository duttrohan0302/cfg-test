// Import Modules
const app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require("passport");

// Import Routes
const routes = require('./routes')

// Import DB URI
const { mongoURI } = require('./config');

// PORT
const PORT = process.env.PORT || 5000;

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Mongoose Connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./middlewares/passport")(passport);

//Use Routes
app.use('/',routes)


//Start Server
app.listen(PORT, ()=>{
    console.log(`Server started at ${PORT}`);
})