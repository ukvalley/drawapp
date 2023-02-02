import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

import Loader from '../../Loader';


import { LAMPORTS_PER_SOL,Connection, PublicKey , Transaction, sendAndConfirmTransaction,Keypair } from '@solana/web3.js';

import face2 from '../../../images/face2.jpg'
import QRCode from 'react-qr-code';
import how1 from '../../../images/how1.png'

import how2 from '../../../images/how2.png'


import how3 from '../../../images/how3.png'

import success from '../../../images/success.png'

import zone365 from '../../../images/zone365.png'
import zone3651 from '../../../images/zone3651.png'
import zone3653 from '../../../images/zone36523.gif'
import celebration from '../../../images/cele1.gif'


const solanaWeb3 = require('@solana/web3.js');


export default function Dashbaord({handleNavbar})
{
 
  const base_url = process.env.REACT_APP_BASE_URL;

  const CONTRACT_KEY = process.env.REACT_APP_CONTRACT_KEY.split(',');

  const [Data,setData] = useState(null);

  const [Balance,SetBalance] = useState(0);

  const [winner,SetWinner] = useState('0000');

  const [Loading,SetLoading] = useState(false);

  const [num1,setNum1] = useState(0);
  const [num2,setNum2] = useState(0);
  const [num3,setNum3] = useState(0);
  const [num4,setNum4] = useState(0);
  const [num5,setNum5] = useState(0);
  const [num6,setNum6] = useState(0);
  const [num7,setNum7] = useState(0);
  const [num8,setNum8] = useState(0);

    const [showCelebration,SetShowCelebration] = useState(false);

  const[winnerStatus,setWinnerStatus] = useState("Draw Start in some time");

  const [timenow,SetTime] = useState(new Date().toLocaleTimeString());


  let connection;;
  let rpcUrl;

  useEffect(() => {

    fetchData()    
    
    
  }, []);

  useEffect(() => {

    getBalance()    
    
    
    
  }, [Data]);

  useEffect(()=>{
    setInterval(() => {
      SetTime(new Date().toLocaleTimeString())
      if(new Date().toLocaleTimeString() == '12:21:30')
      {
        setWinnerStatus("Draw in Process") 
        fn();
      }


      if(new Date().toLocaleTimeString() == '12:23:50')
      {
        SetShowCelebration(true);
      }

      if(new Date().toLocaleTimeString() == '12:23:55')
      {
        SetShowCelebration(false);
      }


      

      

      if(new Date().toLocaleTimeString() >= '12:21:50')
      {
        setWinnerStatus("Winner of the Day is:") 
        setNum1(5)
        setNum2(1)
        setNum3(7)
        setNum4(2)
        setNum5(9)
        setNum6(0)
        setNum7(3)
        setNum8(6)

      }


      

      

    }
    ,1000);
  },[])

  const establishConnection = async () =>{
    rpcUrl="https://api.devnet.solana.com";
    connection = new solanaWeb3.Connection(rpcUrl, 'confirmed');   
    console.log('Connection to cluster established:', rpcUrl);
 }


  function ButtonClicked()
 {
    genererateAccount();
 }

 async function getBalance()
 {
    SetLoading(true);
    establishConnection();
    console.log('a');
      if(Data != null)
      {
        if(Data.Users.public_key != null)
        {
            
            let userkey = Data.Users.private_key.split(',')
            let secretKeyUser = Uint8Array.from(userkey);

            
            let Userkeypair = Keypair.fromSecretKey(secretKeyUser);

            console.log(Userkeypair.publicKey.toBase58())

            let balance = await connection.getBalance(Userkeypair.publicKey);
            let balance1=  balance/LAMPORTS_PER_SOL;
            SetBalance(balance1)
        }
        
      }

      SetLoading(false);
      
 }


  async function genererateAccount()
  {
    SetLoading(true);
    console.log('a');
    establishConnection();
    const baseAccount = Keypair.generate();

   let mint = new PublicKey('Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB');

   

   let programId=new solanaWeb3.PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
    let secretKeyAdmin = Uint8Array.from(CONTRACT_KEY);
    let Adminkeypair = Keypair.fromSecretKey(secretKeyAdmin);

    let balance = await connection.getBalance(Adminkeypair.publicKey);
   console.log (Adminkeypair.publicKey.toString());
   console.log(`balance: ${balance}`);

   let splaccount = solanaWeb3.Keypair.generate();
   
   const transaction = new solanaWeb3.Transaction();

   const instruction = solanaWeb3.SystemProgram.createAccount({
      fromPubkey: Adminkeypair.publicKey,
      newAccountPubkey: splaccount.publicKey,
      space: 165,
      lamports: 0,
      programId,
   });
   transaction.add(instruction);
   var signature = await solanaWeb3.sendAndConfirmTransaction(
      connection, 
      transaction, 
      [Adminkeypair, splaccount]);
   
      console.log(signature);

      if(signature != null)
      {
        let user_id = localStorage.getItem('user_id');
        UpdateUser(user_id,splaccount.secretKey.toString(),splaccount.publicKey.toString());
      }

      SetLoading(false);

  }


  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  async function fn() {

    const delay = ms => new Promise(res => setTimeout(res, ms));

      
    for (let index = 0; index < 100; index++) {
      
      
        setNum1(Math.floor(Math.random() * 10))
        setNum2(Math.floor(Math.random() * 10))
        setNum3(Math.floor(Math.random() * 10))
        setNum4(Math.floor(Math.random() * 10))
        setNum5(Math.floor(Math.random() * 10))
        setNum6(Math.floor(Math.random() * 10))
        setNum7(Math.floor(Math.random() * 10))
        setNum8(Math.floor(Math.random() * 10))

        await delay(200);
      
    }


        setNum1(5)
        setNum2(1)
        setNum3(7)
        setNum4(2)
        setNum5(9)
        setNum6(0)
        setNum7(3)
        setNum8(6)

    


    
    

  }



  






 async function UpdateUser(user_id,private_key,public_key)
  {
    SetLoading(true);
    let formData = new FormData();   
    //append the values with key, value pair
    formData.append('private_key', private_key);   
    formData.append('public_key', public_key);

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
        SetLoading(false);
       
    }

    else {
       
        Swal.fire({
            title: response.data.message,
            text: 'Data Add failed',
            icon: 'error',
            confirmButtonText: 'Okay'
        })

        SetLoading(false);
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
    SetLoading(true);
    let process = true;
    

    if(process == false){
      return false;
    }

     //formdata object
    
    let user_id = localStorage.getItem('user_id');

    axios.get(base_url+'DashboardInformation/'+user_id, 
    
    )
    .then((response) => {
      console.log(response.data);
      setData(response.data);
      if(response.data.status == "true")
      {
        SetLoading(false);
       
      }
      else{
        Swal.fire(
          'Failed!',
          response.data.message,
          'error'
        )
        SetLoading(false);
      }
    
    }, (error) => {
      console.log(error);
    });

  }


  if(Data == null)
  {
    return(
        <></>
    )
  }



return(
 

    <div className="page-wraper">
    {/* Header */}
    <header className="header transparent">
      <div className="main-bar">
        <div className="container">
          <div className="header-content">
            <div className="left-content">
              <a onClick={handleNavbar} className="menu-toggler">
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.4" d="M16.0755 2H19.4615C20.8637 2 22 3.14585 22 4.55996V7.97452C22 9.38864 20.8637 10.5345 19.4615 10.5345H16.0755C14.6732 10.5345 13.537 9.38864 13.537 7.97452V4.55996C13.537 3.14585 14.6732 2 16.0755 2Z" fill="#a19fa8" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z" fill="#a19fa8" />
                </svg>
              </a>
            </div>
            <div className="mid-content">
            </div>
            <div className="right-content">
             
             
            </div>
          </div>
        </div>
      </div>
    </header>
    {/* Header End */}
    {/* Preloader */}
   
    {/* Preloader end*/}
    
    {/* Banner */}
    <div className="banner-wrapper author-notification">
      <div className="container inner-wrapper">
        <div className="dz-info">
          <span>Good Morning</span>
          <h2 className="name mb-0">{Data.Users.name}</h2>
        </div>
        <div className="dz-media media-45 rounded-circle">
          <a href="/customer/profile"><img src={face2} className="rounded-circle" alt="author-image" /></a>
        </div>
      </div>
    </div>
    {/* Banner End */}
    {/* Page Content */}
    <div className="page-content">
      <div className="content-inner pt-0">
        <div className="container fb">
          {/* Search */}
          <form className="m-b30">
            
          </form>

          {/* Dashboard Area */}
          <div className="dashboard-area mt-5">
            {/* Features */}
            <div className="features-box">
              <div className="row m-b20 g-3">

              <div className='row m-b20 g-3'>
                <img src={zone365}></img>
              </div>


             

   
          

          <div class="card-body">
            <div class="row">
              <div class="col">
                <h6 className='text-center'>Contest Of the Day</h6>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <hr />
              </div>
            </div>

  <div className='centerself'>
  <form method="get" class="text-center" data-group-name="digits" data-autosubmit="false" autocomplete="off">
    <h3>{timenow}</h3>
    <h6>{winnerStatus}</h6>
	<input className='input1' type="text" id="digit-1" name="digit-1" data-next="digit-2" disabled value={num1} />
	<input className='input1' type="text" id="digit-2" name="digit-2" data-next="digit-3" data-previous="digit-1" disabled value={num2} />
	<input className='input1' type="text" id="digit-3" name="digit-3" data-next="digit-4" data-previous="digit-2" disabled value={num3} />
	<input className='input1' type="text" id="digit-4" name="digit-4" data-next="digit-5" data-previous="digit-3"  disabled value={num4} />
	<input className='input1' type="text" id="digit-5" name="digit-5" data-next="digit-6" data-previous="digit-4" disabled value={num5} />
	<input className='input1' type="text" id="digit-6" name="digit-6" data-previous="digit-5" disabled value={num6} />
  <input className='input1' type="text" id="digit-7" name="digit-7" data-previous="digit-6" disabled value={num7} />
  <input className='input1' type="text" id="digit-8" name="digit-8" data-previous="digit-7" disabled value={num8} />

</form>
</div>

{showCelebration === true ?
<div className='overlap'>
  
  <img className='celebrationimg' src={celebration} />
  

</div>
: <></>
}



              
    
  </div>


  <div className='row m-b20 g-3'>
                <img src={zone3653}></img>
</div>


                <div className="col">
                  <div className="card card-bx card-content bg-primary">
                    <div className="card-body">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={50} height={50} viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
                        <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                          <rect x={0} y={0} width={24} height={24} />
                          <path d="M5.84026576,8 L18.1597342,8 C19.1999115,8 20.0664437,8.79732479 20.1528258,9.83390904 L20.8194924,17.833909 C20.9112219,18.9346631 20.0932459,19.901362 18.9924919,19.9930915 C18.9372479,19.9976952 18.8818364,20 18.8264009,20 L5.1735991,20 C4.0690296,20 3.1735991,19.1045695 3.1735991,18 C3.1735991,17.9445645 3.17590391,17.889153 3.18050758,17.833909 L3.84717425,9.83390904 C3.93355627,8.79732479 4.80008849,8 5.84026576,8 Z M10.5,10 C10.2238576,10 10,10.2238576 10,10.5 L10,11.5 C10,11.7761424 10.2238576,12 10.5,12 L13.5,12 C13.7761424,12 14,11.7761424 14,11.5 L14,10.5 C14,10.2238576 13.7761424,10 13.5,10 L10.5,10 Z" fill="#fff" />
                          <path d="M10,8 L8,8 L8,7 C8,5.34314575 9.34314575,4 11,4 L13,4 C14.6568542,4 16,5.34314575 16,7 L16,8 L14,8 L14,7 C14,6.44771525 13.5522847,6 13,6 L11,6 C10.4477153,6 10,6.44771525 10,7 L10,8 Z" fill="#fff" fillRule="nonzero" opacity="0.3" />
                        </g>
                      </svg>
                      <div className="card-info">
                        <h4 className="title">0</h4>
                        <p>Total Draw</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col">
                  <div className="card card-bx card-content bg-secondary">
                    <div className="card-body">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={50} height={50} viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
                        <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                          <rect x={0} y={0} width={24} height={24} />
                          <path d="M12,2 C13.8385982,2 15.5193947,3.03878936 16.3416408,4.68328157 L19,10 C20.365323,12.730646 19.25851,16.0510849 16.527864,17.4164079 C15.7602901,17.8001948 14.9139019,18 14.0557281,18 L9.94427191,18 C6.8913169,18 4.41640786,15.525091 4.41640786,12.472136 C4.41640786,11.6139622 4.61621302,10.767574 5,10 L7.65835921,4.68328157 C8.48060532,3.03878936 10.1614018,2 12,2 Z M7.55,13.6 C9.00633458,14.6922509 10.4936654,15.25 12,15.25 C13.5063346,15.25 14.9936654,14.6922509 16.45,13.6 L15.55,12.4 C14.3396679,13.3077491 13.1603321,13.75 12,13.75 C10.8396679,13.75 9.66033208,13.3077491 8.45,12.4 L7.55,13.6 Z" fill="#fff" />
                          <path d="M6.15999985,21.0604779 L8.15999985,17.5963763 C8.43614222,17.1180837 9.04773263,16.9542085 9.52602525,17.2303509 C10.0043179,17.5064933 10.168193,18.1180837 9.89205065,18.5963763 L7.89205065,22.0604779 C7.61590828,22.5387706 7.00431787,22.7026457 6.52602525,22.4265033 C6.04773263,22.150361 5.88385747,21.5387706 6.15999985,21.0604779 Z M17.8320512,21.0301278 C18.1081936,21.5084204 17.9443184,22.1200108 17.4660258,22.3961532 C16.9877332,22.6722956 16.3761428,22.5084204 16.1000004,22.0301278 L14.1000004,18.5660262 C13.823858,18.0877335 13.9877332,17.4761431 14.4660258,17.2000008 C14.9443184,16.9238584 15.5559088,17.0877335 15.8320512,17.5660262 L17.8320512,21.0301278 Z" fill="#fff" opacity="0.3" />
                        </g>
                      </svg>
                      <div  className="card-info">
                        <h4 className="title">{Balance}</h4>
                        <p>Wallet Balance</p>
                      </div>
                    </div>
                  </div>
                </div>
                
               {/* //changes     */}
               <hr style={{height:"0"}}/>
               <div className="col">
                  <div className="card card-bx card-content bg-primary">
                    <div className="card-body">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={50} height={50} viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
                        <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                          <rect x={0} y={0} width={24} height={24} />
                          <path d="M5.84026576,8 L18.1597342,8 C19.1999115,8 20.0664437,8.79732479 20.1528258,9.83390904 L20.8194924,17.833909 C20.9112219,18.9346631 20.0932459,19.901362 18.9924919,19.9930915 C18.9372479,19.9976952 18.8818364,20 18.8264009,20 L5.1735991,20 C4.0690296,20 3.1735991,19.1045695 3.1735991,18 C3.1735991,17.9445645 3.17590391,17.889153 3.18050758,17.833909 L3.84717425,9.83390904 C3.93355627,8.79732479 4.80008849,8 5.84026576,8 Z M10.5,10 C10.2238576,10 10,10.2238576 10,10.5 L10,11.5 C10,11.7761424 10.2238576,12 10.5,12 L13.5,12 C13.7761424,12 14,11.7761424 14,11.5 L14,10.5 C14,10.2238576 13.7761424,10 13.5,10 L10.5,10 Z" fill="#fff" />
                          <path d="M10,8 L8,8 L8,7 C8,5.34314575 9.34314575,4 11,4 L13,4 C14.6568542,4 16,5.34314575 16,7 L16,8 L14,8 L14,7 C14,6.44771525 13.5522847,6 13,6 L11,6 C10.4477153,6 10,6.44771525 10,7 L10,8 Z" fill="#fff" fillRule="nonzero" opacity="0.3" />
                        </g>
                      </svg>
                      <div className="card-info">
                        <h4 className="title">0</h4>
                        <p>My Wining</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card card-bx card-content bg-secondary">
                    <div className="card-body">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={50} height={50} viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
                        <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                          <rect x={0} y={0} width={24} height={24} />
                          <path d="M5.84026576,8 L18.1597342,8 C19.1999115,8 20.0664437,8.79732479 20.1528258,9.83390904 L20.8194924,17.833909 C20.9112219,18.9346631 20.0932459,19.901362 18.9924919,19.9930915 C18.9372479,19.9976952 18.8818364,20 18.8264009,20 L5.1735991,20 C4.0690296,20 3.1735991,19.1045695 3.1735991,18 C3.1735991,17.9445645 3.17590391,17.889153 3.18050758,17.833909 L3.84717425,9.83390904 C3.93355627,8.79732479 4.80008849,8 5.84026576,8 Z M10.5,10 C10.2238576,10 10,10.2238576 10,10.5 L10,11.5 C10,11.7761424 10.2238576,12 10.5,12 L13.5,12 C13.7761424,12 14,11.7761424 14,11.5 L14,10.5 C14,10.2238576 13.7761424,10 13.5,10 L10.5,10 Z" fill="#fff" />
                          <path d="M10,8 L8,8 L8,7 C8,5.34314575 9.34314575,4 11,4 L13,4 C14.6568542,4 16,5.34314575 16,7 L16,8 L14,8 L14,7 C14,6.44771525 13.5522847,6 13,6 L11,6 C10.4477153,6 10,6.44771525 10,7 L10,8 Z" fill="#fff" fillRule="nonzero" opacity="0.3" />
                        </g>
                      </svg>
                      <div className="card-info">
                        <h4 className="title">0</h4>
                        <p>My Draw</p>
                      </div>
                    </div>
                  </div>
                </div>


              </div>    
            </div>
            {/* Features End */}
            {/* Categorie */}


            <div className='row m-b20 g-3'>
                <img src={zone3651}></img>
              </div>


            <section class="how-section padding-top padding-bottom pos-rel">
        <div class="container">
            <div class="section-header text-lg-left">
                <h2 class="title">How it works</h2>
                <p>Easy 3 steps to win</p>
            </div>
            <div class="row justify-content-center mb--40">
                <div class="col-4">
                    <div class="how-item">
                        <div class="how-thumb">
                            <img src={how1} alt="how"/>
                        </div>
                        <div class="how-content">
                            <h6 class="title">Sign Up</h6>
                            
                        </div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="how-item">
                        <div class="how-thumb">
                            <img src={how2} alt="how"/>
                        </div>
                        <div class="how-content">
                            <h6 class="title">Bid</h6>
                            
                        </div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="how-item">
                        <div class="how-thumb">
                            <img src={how3} alt="how"/>
                        </div>
                        <div class="how-content">
                            <h6 class="title">Win</h6>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>








            
           
           
          </div>
        </div>    
      </div>
    </div>    
    {/* Page Content End*/}
    
    {/* Theme Color Settings */}




  </div>

);

}