import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import axios from 'axios'

import './index.css';

import App from './App';

import Login from "./auth/logIn"; //login

import SignUp from "./auth/sigup"; //signup

import ResetPassword from "./auth/resetPassword"; //resetpassword

import ForgotPassword from "./auth/forgotpassword"; //forgotpassword


axios.defaults.baseURL = 'http://localhost:5000/';
// axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

ReactDOM.render(

  <React.StrictMode>

    <BrowserRouter>
      
      <Routes>

        <Route index element = {<Login />}></Route>

        <Route path='/signup' element={<SignUp />}></Route>

        <Route path='/app' element={<App />}></Route>
        
        <Route path='/resetpassword' element={<ResetPassword />}></Route>
         
        <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>

      </Routes>
      
    </BrowserRouter>
    
  </React.StrictMode>,
  
  document.getElementById('root')
  
);


