import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

import face2 from '../../../images/face2.jpg'


export default function Profile({handleNavbar})
{
 
  const base_url = process.env.REACT_APP_BASE_URL;

  const [Data,setData] = useState(null);

  const [FAdhar,setFAdhar] = useState('');
  const [FPan,setFPan] = useState('');

  const [AdharError,setAdharError] = useState('');
  const [PanError,setPanError] = useState('');

  const [FProfileImage,setFProfileImage] = useState('');

  const [FAdharFrontImage,setFAdharFrontImage] = useState('');
  const [FAdharBackImage,setFAdharBackImage] = useState('');
  const [FPanCardImage,setFPanCardImage] = useState('');
  const [FBankStatementImage,setFBankStatementImage] = useState('');

  let user_id = localStorage.getItem('user_id');


  useEffect(() => {

    fetchData()    
    
  }, []);


 async function UpdateUser()
  {

    let process = true;
    setAdharError('');
    setPanError('');
    

    if(FAdhar == null || FAdhar == '' || FAdhar.length <= 4)
    {
      setAdharError('Enter Correct Adhar Number');
    }
    
    if(FPan == null || FPan == '')
    {
      setPanError('Enter Correct Pan Number');
      process = false;
    }

    

    if(process == false){
      return false;
    }

    console.log(FProfileImage);
     //formdata object
    let formData = new FormData();   
    //append the values with key, value pair
    formData.append('adhar', FAdhar);   
    formData.append('pan', FPan);

    if(FProfileImage != '' || FProfileImage != null)
    {
        formData.append('profile_picture', FProfileImage);
    }

    if(FAdharFrontImage != '' || FAdharFrontImage != null)
    {
        formData.append('adhar_image_front', FAdharFrontImage);
    }

    if(FAdharBackImage != '' || FAdharBackImage != null)
    {
        formData.append('adhar_image_back', FAdharBackImage);
    }

    if(FPanCardImage != '' || FPanCardImage != null)
    {
        formData.append('pan_image', FPanCardImage);
    }

    if(FBankStatementImage != '' || FBankStatementImage != null)
    {
        formData.append('bank_statement', FBankStatementImage);
    }
    
   


    await axios.post(base_url+'UpdateUserInformation/'+user_id,
    formData ,
    { headers: {
    'accept': 'application/json',
    'Accept-Language': 'en-US,en;q=0.8',
    "Content-Type": `multipart/form-data: boundary=add-random-characters`,
    "Access-Control-Allow-Origin": "*",
     }})
   .then(function (response)
    {
    console.log(response);
   
    if (response.data.status == "true") {
        Swal.fire({
            title: response.data.message,
            text: 'Data Added Successfully',
            icon: 'success',
            confirmButtonText: 'Okay'
        })

        fetchData();
       
    }

    else {
       
        Swal.fire({
            title: response.data.message,
            text: 'Data Add failed',
            icon: 'error',
            confirmButtonText: 'Okay'
        })
    }
})
.catch(function (error) {
    
    console.log(error);
    Swal.fire({
        title: error.message,
        text: 'Data Add failed',
        icon: 'error',
        confirmButtonText: 'Okay'
    })
});

    


}
  
  
  
  
  function fetchData()
  {

    let process = true;
      //formdata object
      let formData = new FormData();   
      //append the values with key, value pair
      formData.append('adhar_image_front', FProfileImage);   

    if(process == false){
      return false;
    }

     //formdata object
    
    

    axios.get(base_url+'DashboardInformation/'+user_id, 
    
    )
    .then((response) => {
      console.log(response.data);
      setData(response.data);

      setFAdhar(response.data.Users.adhar);
      setFPan(response.data.Users.pan);
      

      if(response.data.status == "true")
      {

       
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

  function handleProfileFile(e)
  {
    setFProfileImage(e.target.files[0]);
  }

  function handleAdharFrontFile(e)
  {
    setFAdharFrontImage(e.target.files[0]);
  }

  function handleAdharBackFile(e)
  {
    setFAdharBackImage(e.target.files[0]);
  }


  function handlePanCardFile(e)
  {
    setFPanCardImage(e.target.files[0]);
  }

  function handleBankFile(e)
  {
    setFBankStatementImage(e.target.files[0]);
  }


  if(Data == null)
  {
    return(
        <></>
    )
  }



return(
 

    <div className="page-wraper">
        {/* Preloader */}
        <div id="preloader" style={{display: 'none'}}>
          <div className="spinner" />
        </div>
        {/* Preloader end*/}
        {/* Page Content */}
        <div className="page-content bottom-content">
          {/* Banner */}
          <div className="head-details">
            <div className=" container">
              <div className="dz-info">
                <span className="location d-block">Update Your Profile</span>
                <h5 className="title">Complete your Profile</h5>
              </div>
              <div className="dz-media media-65">
                <img src="assets/images/logo/logo.svg" alt="" />
              </div>
            </div>
          </div>
          <div className="fixed-content"> 
            <div className="container">
              <div className="main-content">
                <div className="left-content">
                  <Link to="/customer/dashboard" className="back-btn">
                    <svg width={18} height={18} viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.03033 0.46967C9.2966 0.735936 9.3208 1.1526 9.10295 1.44621L9.03033 1.53033L2.561 8L9.03033 14.4697C9.2966 14.7359 9.3208 15.1526 9.10295 15.4462L9.03033 15.5303C8.76406 15.7966 8.3474 15.8208 8.05379 15.6029L7.96967 15.5303L0.96967 8.53033C0.703403 8.26406 0.679197 7.8474 0.897052 7.55379L0.96967 7.46967L7.96967 0.46967C8.26256 0.176777 8.73744 0.176777 9.03033 0.46967Z" fill="#a19fa8" />
                    </svg>
                  </Link>
                </div>
                <div className="mid-content">
                  <h5 className="mb-0">Apply</h5>
                </div>
              </div>
            </div>
          </div>
          {/* Banner End */}
          <div className="container">
            <form className="my-2" encType="multipart/form-data">
              
              
              <div className="input-group">
                <input type="text" placeholder="Name" value={Data.Users.name} readOnly className="form-control" />
              </div>
              <div className="input-group">
                <input type="text" placeholder="User email" value={Data.Users.email} readOnly className="form-control" />
              </div>
              
              <div className="input-group">
                <input type="text" placeholder="Phone number" value={Data.Users.mobile} readOnly className="form-control" />
              </div>


              <div className="input-group">
                <input type="text" placeholder="Adhar Number" value={FAdhar} onChange={(e) => {setFAdhar(e.target.value)}}  className="form-control" />
              </div>
              <p className='badge w-100 light badge-danger'>{AdharError}</p>

              <div className="input-group">
                <input type="text" placeholder="Pan Number" value={FPan} onChange={(e) => {setFPan(e.target.value)}}  className="form-control" />
              </div>
              <p className='badge w-100 light badge-danger'>{PanError}</p>

               <p className='ms-2'>Profile Picture</p>
              <div className="input-group width50">
                <input  type="file" accept="image/*" id="profile_pic"  onChange={(e) => handleProfileFile(e)} className="imageuplodify form-control" />
              </div>
              {Data.Users.profile_picture != null ? 
              <img style={{width:"150px"}} src={"https://bitbns.net/drawapp/public/upload/"+Data.Users.profile_picture}></img>
              :<></>} 

              <p className='ms-2'>Adhar Card Front</p>
              <div className="input-group width50">
                <input type="file" accept="image/*" id="adhar_front" onChange={(e) => handleAdharFrontFile(e)} className="imageuplodify form-control" />
              </div>

              {Data.Users.adhar_image_front != null ? 
              <img style={{width:"150px"}} src={"https://bitbns.net/drawapp/public/upload/"+Data.Users.adhar_image_front}></img>
              :<></>} 


              <p className='ms-2'>Adhar Card Back</p>
              
              <div className="input-group ">
                <input type="file" accept="image/*" id="adhar_back" onChange={(e) => handleAdharBackFile(e)} className="imageuplodify form-control" />
             
              </div>
              
              {Data.Users.adhar_image_back != null ? 
              <img style={{width:"150px"}} src={"https://bitbns.net/drawapp/public/upload/"+Data.Users.adhar_image_back}></img>
              :<></>}
             

              

              <p className='ms-2'>Pan Card</p>
              <div className="input-group width50">
                <input type="file" accept="image/*" id="pan_card" onChange={(e) => handlePanCardFile(e)} className="imageuplodify form-control" />
              </div>

              {Data.Users.pan_image != null ? 
              <img style={{width:"150px"}} src={"https://bitbns.net/drawapp/public/upload/"+Data.Users.pan_image}></img>
              :<></>} 

              <p className='ms-2'>Bank Statement</p>
              <div className="input-group width50">
                <input type="file" accept="image/*" id="pan_card" onChange={(e) => handleBankFile(e)} className="imageuplodify form-control" />
              </div>

              {Data.Users.bank_statement != null ? 
              <img style={{width:"150px"}} src={"https://bitbns.net/drawapp/public/upload/"+Data.Users.bank_statement}></img>
              :<></>} 


              <div className="input-group">
              <button type='button' onClick={UpdateUser} className="btn mt-2 btn-primary w-100 btn-rounded">Update Profile</button>
              </div>


            </form>
          </div>
          {/* Page Content End */}
          {/* Footer */}
          <footer className="footer fixed">
            <div className="container">
              <a href="company-detail.html" className="btn btn-primary w-100 btn-rounded">Apply job</a>
            </div>
          </footer>
          {/* Footer End */}
        </div>    
      </div>

);

}