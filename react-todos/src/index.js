import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import axios from 'axios'

import './index.css';

import App from './App';

import Login from "./pages/logIn";

import SignUp from "./pages/sigup";


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
        
      </Routes>
      
    </BrowserRouter>
    
  </React.StrictMode>,
  
  document.getElementById('root')
  
);


