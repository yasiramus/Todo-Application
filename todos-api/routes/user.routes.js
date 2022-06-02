const express = require('express'); //express

const Router = express.Router();//router

const { sendData, verifyEmail, userLogIn, reSendNewOtp, populateTodo,
    resetPassword, forgotPassword, resetForgottenPassword, logOut } = require('../controller/user.Controller');

Router.post('/', sendData);//signup 

Router.post('/verifyEmail/:id', verifyEmail ); //verify email

Router.post('/login', userLogIn); //login

Router.put('/:userId/reSendNewOtp', reSendNewOtp); //resendOtp

Router.get("/populateUser/:id", populateTodo) //populating of todos

Router.put("/resetPassword", resetPassword ); //change password

Router.put("/forgotPassword/:email", forgotPassword ); //forgotPassword

Router.put("/:resetToken/resetforgotPassword/", resetForgottenPassword); //reset forgotPassword

Router.delete("/logOut", logOut); //logout

module.exports = { Router };