const express = require('express'); //requirng the express framework

const morgan = require('morgan'); //requiring the morgan third party package

const cors = require('cors'); //requiring the third party module

const cookieParser = require('cookie-parser'); //requiring the cookie parser 

// importing the database connection 
const { dbConnection } = require('./db');

// requiring and destructing of the router from the todoRoutes.js in the routes folder 
const { router } = require('./routes/todoRoutes');

// requiring and destructing of the router from the user.routes.js in the routes folder 
const { Router } = require('./routes/user.routes');

//declaring the app variable
const app = express();

const Port = process.env.Port || 5000; //setting of port number

// middlewares
app.use(cookieParser()); //using the cookies globally

// setting the environment to development
if ( app.get('env') === "development") {
    
    app.use(morgan('dev'))

};


app.use(express.urlencoded({ extended: false })); //access to the form data

app.use(express.json()); //req.body

// setting the cors globally and setting it origin to the require endpoint
app.use(cors({

    // we set the credentials when we are working or two or more endpoint numbers
    credentials: true,
    
    origin: 'http://localhost:3000',

    // methods: ['*'] //* means all the http request
    
}))

// setting todo path globally
app.use('/api/todo', router);

// setting user path globally
app.use('/user', Router);



// server listening on Port 5000
app.listen(Port, () => {

    // calling the database function
    dbConnection(), console.log(`server listening on ${Port}`)

});