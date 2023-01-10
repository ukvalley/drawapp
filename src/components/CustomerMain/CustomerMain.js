import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './CustomerMain.module.css';
import Dashbaord from './Dashboard/Dashboard';
import { Route, Routes,useNavigate } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Menubar from './Menubar/Menubar';
import Profile from './Profile/Profile';

export default function CustomerMain()
{
  let navigate = useNavigate();

  const [navbarShow,setNavbarShow] = useState(false);

  

  useEffect(() => {

    const loggedUser = localStorage.getItem('user_id');

    if(loggedUser ==  null)
    {
      navigate('/login')
    }
    
  }, []);
  
  function handleNavbar()
  {
    if(navbarShow == false)
    {
      setNavbarShow(true);
    }
    else
    {
      setNavbarShow(false);
    }
  }


  function handleNavbarOutclick()
  {
    if(navbarShow == true)
    {
      setNavbarShow(false);
    }
  }


  

  return (
  
  <div className={styles.CustomerMain}>
    {navbarShow == true ?
    <Navbar handleNavbarOutclick={handleNavbarOutclick}/>
    :<></>}
      <Routes>
       <Route path="/" element={<Dashbaord handleNavbar={handleNavbar} />} />
       <Route path="/dashboard" element={<Dashbaord handleNavbar={handleNavbar} />} />
       <Route path="/profile" element={<Profile handleNavbar={handleNavbar} />} />
      
      </Routes>

      <Menubar/>
  </div>
);
}
