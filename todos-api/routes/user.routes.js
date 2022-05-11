const express = require('express'); //express

const Router = express.Router();//router

const { sendData, userLogIn, populateTodo, resetPassword,logOut  } = require('../controller/user.Controller');

Router.post( '/', sendData );//signup

Router.post('/login', userLogIn); //login

Router.get("/populateUser/:id", populateTodo) //populating of todos

Router.delete("/logOut", logOut)

Router.put("/resetPassword", resetPassword )

module.exports = { Router };