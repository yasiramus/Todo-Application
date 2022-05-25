import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import axios from 'axios'

import './index.css';

import App from './App';

import Login from "./auth/logIn"; //login

import SignUp from "./auth/sigup"; //signup

import VerifyEmail from './pages/confirm_email';

import ResetPassword from "./auth/resetPassword"; //resetpassword

import ForgotPassword from "./auth/forgotpassword"; //forgotpassword

import ForgotPasswordReset from "./auth/forgotPasswordLink"; //forgotpasswordreset

// axios
axios.defaults.baseURL = 'http://localhost:5000/';
axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

// Add a request interceptor
axios.interceptors.request.use(request => {
  
  // Do something before request is sent
console.log('axios request : ', request);
  return request;

}, error => {
  // Do something with request error

  console.log(error);
  return Promise.reject(error);
});


ReactDOM.render(

  <React.StrictMode>

    <BrowserRouter>
      
      <Routes>

        <Route index element = {<Login />}></Route>

        <Route path='/signup' element={<SignUp />}></Route>

        <Route path='/confirm_email' element={<VerifyEmail/>} ></Route>

        <Route path='/app' element={<App />}></Route>
        
        <Route path='/resetpassword' element={<ResetPassword />}></Route>

        <Route path='/forgotpassword' element={<ForgotPassword />}></Route>
        
        <Route path='/forgotpassword/:resetToken' element={<ForgotPasswordReset />}></Route>

      </Routes>
      
    </BrowserRouter>
    
  </React.StrictMode>,
  
  document.getElementById('root')
  
);


