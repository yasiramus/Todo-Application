const express = require('express'); //express

const Router = express.Router();//router

const { sendData, userLogIn, populateTodo, resetPassword, forgotPassword, logOut  } = require('../controller/user.Controller');

Router.post( '/', sendData );//signup

Router.post('/login', userLogIn); //login

Router.get("/populateUser/:id", populateTodo) //populating of todos

Router.put("/resetPassword", resetPassword ); //change password

Router.put("/forgotPassword/:email", forgotPassword ); //forgotPassword

Router.delete("/logOut", logOut); //logout

module.exports = { Router };