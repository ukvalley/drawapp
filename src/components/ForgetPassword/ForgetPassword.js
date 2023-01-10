import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link,useNavigate  } from 'react-router-dom';

export default function ForgetPassword()
{
 
  const base_url = process.env.REACT_APP_BASE_URL;
  const [Femail,setFemail] = useState('');
  const [EmailError,setEmailError] = useState('');

  const [Fotp,setFotp] = useState('');
  const [OtpError,setOtpError] = useState('');
  const [Fpassword,setFpassword] = useState('');
  const [PasswordError,setPasswordError] = useState('');
  const [FCpassword,setFCpassword] = useState('');
  const [CPasswordError,setCPasswordError] = useState('');

  const [ActivationSent,setActivationSent] = useState(false);
  let navigate = useNavigate();

 async function ForgetInit()
  {

    let process = true;
    setEmailError('');
    
    
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    if(Femail == null || Femail == '' || regex.test(Femail) === false)
    {
      setEmailError('Enter Correct Name Email');
      process = false;
    }

    

   

    if(process == false){
      return false;
    }

     //formdata object
    let formData = new FormData();   
    //append the values with key, value pair

    formData.append('email', Femail);
    
    console.log(base_url);

   await axios.post(base_url+'ForgotPasswordInit', 
    
      formData
    )
    .then((response) => {
      console.log(response);
      if(response.data.status == "true")
      {
        setActivationSent(true);
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


  async function VerifyOtp()
  {

    let process = true;
    
    setEmailError('');
    
    
    
    if(Fotp == null || Fotp == '')
    {
      setOtpError('Enter Correct OTP');
      process = false;
    }

    if(Fpassword == null || Fpassword == '')
    {
      setPasswordError('Enter Correct Password');
      process = false;
    }

    if(FCpassword == null || FCpassword == '' || FCpassword != Fpassword)
    {
      setCPasswordError('Password and Confirm password field should match');
      process = false;
    }
    

   

    if(process == false){
      return false;
    }

     //formdata object
    let formData = new FormData();   
    //append the values with key, value pair

    formData.append('email_activation_code', Fotp);
    formData.append('email', Femail);
    formData.append('password', FCpassword);
    
    console.log(base_url);

   await axios.post(base_url+'VerifyOtp', 
    
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
        
        navigate('/login')
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
  <div >
      <div className="page-wraper">
        {/* Preloader */}
        
        {/* Preloader end*/}
        {/* Page Content */}
        {ActivationSent == false ? 
        <div className="page-content">
          {/* Banner */}
          <div className="banner-wrapper shape-1">
            <div className="container inner-wrapper">
              <h2 className="dz-title">Forget Password</h2>
              <p className="mb-0">Please Enter Details</p>
            </div>
          </div>
          {/* Banner End */}    
          <div className="container">
            <div className="account-area">
              <form>
              
                

                <div className="input-group">
                  <input type="email" value={Femail} onChange={(e) => {setFemail(e.target.value)}} placeholder="User Email" className="form-control" />
                </div>
                <p className='badge w-100 light badge-danger'>{EmailError}</p>
                
                


                
                <div className="input-group">
                  <button type='button' onClick={ForgetInit} className="btn mt-2 btn-primary w-100 btn-rounded">Get Activation Code</button>
                </div>
               <Link to="/login"> <p className="text-center">Sign In </p> </Link>
              </form>
            </div>
          </div>
        </div>

        :
        <div className="page-content">
          {/* Banner */}
          <div className="banner-wrapper shape-1">
            <div className="container inner-wrapper">
              <h2 className="dz-title">Enter OTP</h2>
              <p className="mb-0">Please Verify OTP and Change Password</p>
            </div>
          </div>
          {/* Banner End */}    
          <div className="container">
            <div className="account-area">
              <form>
              
                

                <div className="input-group">
                  <input type="text" value={Fotp} onChange={(e) => {setFotp(e.target.value)}} placeholder="Enter OTP" className="form-control" />
                </div>
                <p className='badge w-100 light badge-danger'>{OtpError}</p>


                <div className="input-group">
                  <input type="password" value={Fpassword} onChange={(e) => {setFpassword(e.target.value)}} placeholder="Enter Password" className="form-control" />
                </div>
                <p className='badge w-100 light badge-danger'>{PasswordError}</p>
                
                <div className="input-group">
                  <input type="password" value={FCpassword} onChange={(e) => {setFCpassword(e.target.value)}} placeholder="Confirm Password" className="form-control" />
                </div>
                <p className='badge w-100 light badge-danger'>{CPasswordError}</p>


                
                <div className="input-group">
                  <button type='button' onClick={VerifyOtp} className="btn mt-2 btn-primary w-100 btn-rounded">Reset Password</button>
                </div>
               <Link to="/login"> <p className="text-center">Sign In </p> </Link>
              </form>
            </div>
          </div>
        </div>

        }


        {/* Page Content End */}
        {/* Footer */}
        <footer className="footer fixed">
          <div className="container">
          <Link className='btn btn-primary light btn-rounded text-primary d-block' to='/register'>  Sign Up </Link>
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