const express = require('express'); //express

const Router = express.Router();//router

const { sendData, verifyEmail, userLogIn, populateTodo,
    resetPassword, forgotPassword, resetForgottenPassword, logOut } = require('../controller/user.Controller');

// const { sendDatas, varifyEmail } = require("../controller/sign")
// Router.post('/otp', sendDatas);//signup



Router.post('/', sendData);//signup 

Router.post('/verifyEmail/:id', verifyEmail ); //verify email

Router.post('/login', userLogIn); //login

Router.get("/populateUser/:id", populateTodo) //populating of todos

Router.put("/resetPassword", resetPassword ); //change password

Router.put("/forgotPassword/:email", forgotPassword ); //forgotPassword

Router.put("/:resetToken/resetforgotPassword/", resetForgottenPassword); //reset forgotPassword

Router.delete("/logOut", logOut); //logout

module.exports = { Router };