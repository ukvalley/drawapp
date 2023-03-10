import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Register.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default function Register()
{
 
  const base_url = process.env.REACT_APP_BASE_URL;



  const [Fname,setFname] = useState('');
  const [Femail,setFemail] = useState('');
  const [Fmobile,setFmobile] = useState('');
  const [Fpassword,setFpassword] = useState('');

  const [NameError,setNameError] = useState('');
  const [EmailError,setEmailError] = useState('');
  const [PasswordError,setPasswordError] = useState('');
  const [MobileError,setMobileError] = useState('');

  function registerUser()
  {

    let process = true;
    setNameError('');
    setMobileError('');
    setEmailError('');
    setPasswordError('');

    if(Fname == null || Fname == '' || Fname.length <= 4)
    {
      setNameError('Enter Correct Name');
    }
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    if(Femail == null || Femail == '' || regex.test(Femail) === false)
    {
      setEmailError('Enter Correct Name Email');
      process = false;
    }

    if(Fpassword == null || Fpassword == '' || Fpassword.length <= 6)
    {
      setPasswordError('Enter Correct Name Password');
      process = false;
    }

    if(Fmobile == null || Fmobile== '' || Fmobile.length != 10)
    {
      setMobileError('Enter Correct Name Mobile Number');
      process = false;
    }

    if(process == false){
      return false;
    }

     //formdata object
    let formData = new FormData();   
    //append the values with key, value pair
    formData.append('name', Fname);   
    formData.append('mobile', Fmobile);
    formData.append('email', Femail);
    formData.append('password', Fpassword);

    console.log(base_url);

    axios.post(base_url+'RegisterPost', 
    
      formData
    )
    .then((response) => {
      console.log(response);
      if(response.data.status == "true")
      {
        Swal.fire(
          'Success!',
          response.data.message,
          'success'
        )
      }
      else{
        Swal.fire(
          'Failed!',
          response.data.message,
          'error'
        )
      }
    
    }, (error) => {
      console.log(error);
    });

  }



return(
  <div className={styles.Register}>
      <div className="page-wraper">
        {/* Preloader */}
        
        {/* Preloader end*/}
        {/* Page Content */}
        <div className="page-content">
          {/* Banner */}
          <div className="banner-wrapper shape-1">
            <div className="container inner-wrapper">
              <h2 className="dz-title">Create an Account</h2>
              <p className="mb-0">Please fill registration form below</p>
            </div>
          </div>
          {/* Banner End */}    
          <div className="container">
            <div className="account-area">
              <form>
              
                <div className="input-group">
                  <input type="text" value={Fname} onChange={(e) => {setFname(e.target.value)}} placeholder="User Name" className="form-control" />
                </div>
                <p className='badge w-100 light badge-danger'>{NameError}</p>
                <div className="input-group">
                  <input type="email" value={Femail} onChange={(e) => {setFemail(e.target.value)}} placeholder="User Email" className="form-control" />
                </div>
                <p className='badge w-100 light badge-danger'>{EmailError}</p>
                <div className="input-group">
                  <input type="text" value={Fmobile} onChange={(e) => {setFmobile(e.target.value)}} placeholder="Mobile Number" className="form-control" />
                </div>
                <p className='badge w-100 light badge-danger'>{MobileError}</p>
                

                <div className="input-group">
                  <input type="password" value={Fpassword} onChange={(e) => {setFpassword(e.target.value)}} placeholder="Password" id="dz-password" className="form-control be-0" />
                  <span className="input-group-text show-pass"> 
                    <i className="fa fa-eye-slash" />
                    <i className="fa fa-eye" />
                  </span>
                </div>
                <p className='badge w-100 light badge-danger'>{PasswordError}</p>
                <div className="input-group">
                  <button type='button' onClick={registerUser} className="btn mt-2 btn-primary w-100 btn-rounded">Sign UP</button>
                </div>
                <p className="text-center">By tapping ???Sign Up??? you accept our <a href="javascript:void(0);" className="text-primary font-w700">terms</a> and <a href="javascript:void(0);" className="text-primary font-w700">condition</a></p>
              </form>
            </div>
          </div>
        </div>
        {/* Page Content End */}
        {/* Footer */}
        <footer className="footer fixed">
          <div className="container">
          <Link className='btn btn-primary light btn-rounded text-primary d-block' to='/login'>  Login </Link>
          </div>
        </footer>
        {/* Footer End */}
        {/* Theme Color Settings */}
        <div className="offcanvas offcanvas-bottom" tabIndex={-1} id="offcanvasBottom">
          <div className="offcanvas-body small">
            <ul className="theme-color-settings">
              <li>
                <input className="filled-in" id="primary_color_8" name="theme_color" type="radio" defaultValue="color-primary" />
                <label htmlFor="primary_color_8" />
                <span>Default</span>
              </li>
              <li>
                <input className="filled-in" id="primary_color_2" name="theme_color" type="radio" defaultValue="color-green" />
                <label htmlFor="primary_color_2" />
                <span>Green</span>
              </li>
              <li>
                <input className="filled-in" id="primary_color_3" name="theme_color" type="radio" defaultValue="color-blue" />
                <label htmlFor="primary_color_3" />
                <span>Blue</span>
              </li>
              <li>
                <input className="filled-in" id="primary_color_4" name="theme_color" type="radio" defaultValue="color-pink" />
                <label htmlFor="primary_color_4" />
                <span>Pink</span>
              </li>
              <li>
                <input className="filled-in" id="primary_color_5" name="theme_color" type="radio" defaultValue="color-yellow" />
                <label htmlFor="primary_color_5" />
                <span>Yellow</span>
              </li>
              <li>
                <input className="filled-in" id="primary_color_6" name="theme_color" type="radio" defaultValue="color-orange" />
                <label htmlFor="primary_color_6" />
                <span>Orange</span>
              </li>
              <li>
                <input className="filled-in" id="primary_color_7" name="theme_color" type="radio" defaultValue="color-purple" />
                <label htmlFor="primary_color_7" />
                <span>Purple</span>
              </li>
              <li>
                <input className="filled-in" id="primary_color_1" name="theme_color" type="radio" defaultValue="color-red" />
                <label htmlFor="primary_color_1" />
                <span>Red</span>
              </li>
              <li>
                <input className="filled-in" id="primary_color_9" name="theme_color" type="radio" defaultValue="color-lightblue" />
                <label htmlFor="primary_color_9" />
                <span>Lightblue</span>
              </li>
              <li>
                <input className="filled-in" id="primary_color_10" name="theme_color" type="radio" defaultValue="color-teal" />
                <label htmlFor="primary_color_10" />
                <span>Teal</span>
              </li>
              <li>
                <input className="filled-in" id="primary_color_11" name="theme_color" type="radio" defaultValue="color-lime" />
                <label htmlFor="primary_color_11" />
                <span>Lime</span>
              </li>
              <li>
                <input className="filled-in" id="primary_color_12" name="theme_color" type="radio" defaultValue="color-deeporange" />
                <label htmlFor="primary_color_12" />
                <span>Deeporange</span>
              </li>
            </ul>
          </div>
        </div>
        {/* Theme Color Settings End */}
      </div>

  </div>
);

}