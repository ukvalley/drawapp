import React from 'react';
import PropTypes from 'prop-types';
import styles from './Main.module.css';

import HomePage from '../HomePage/HomePage'
import Login from '../Login/Login'

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Register from '../Register/Register';
import ForgetPassword from '../ForgetPassword/ForgetPassword';

const Main = () => (
  <div className={styles.Main}>
   
  
      <Routes>
       <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget_password" element={<ForgetPassword/>} />
      </Routes>
  </div>
);

Main.propTypes = {};

Main.defaultProps = {};

export default Main;
