// requiring the express package 
const express = require('express');

// requiring the inbuilt router from express package
const router = express.Router();

// destructing of all fuctions from the todoController.js file 
const { addTodo, fetchSingleTodo, deleteTodo, updateTodo } = require('../controller/todoController');

// miidleware
const { auth } = require("../authorization/auth");

// passing the middleware to post request to varify the prescence of the token 
router.post('/:userId', auth, addTodo);//this is being used

// passing the middleware to post request to varify the prescence of the token 
router.get('/:id', auth,  fetchSingleTodo);//this is being used

// passing the middleware to post request to varify the prescence of the token 
router.delete('/:id/:userId', auth, deleteTodo);//this is being used

// passing the middleware to post request to varify the prescence of the token 
router.put('/:id', auth, updateTodo);//this is being used

// router.get('/',  fetchAllTodo);//no longer in use

module.exports = {
    router
};