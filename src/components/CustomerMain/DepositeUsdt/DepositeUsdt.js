import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

import * as buffer from "buffer";



import { createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer } from '@solana/spl-token';



import { LAMPORTS_PER_SOL,Connection, PublicKey , Transaction, sendAndConfirmTransaction,Keypair } from '@solana/web3.js';

import face2 from '../../../images/face2.jpg'
import QRCode from 'react-qr-code';

const solanaWeb3 = require('@solana/web3.js');


export default function DepositeUsdt({handleNavbar})
{
 
  const base_url = process.env.REACT_APP_BASE_URL;

  const CONTRACT_KEY = process.env.REACT_APP_CONTRACT_KEY.split(',');

  const [Data,setData] = useState(null);

  const [Balance,SetBalance] = useState(0);

  let connection;;
  let rpcUrl;

  useEffect(() => {

    fetchData()    
    
    
  }, []);

  useEffect(() => {

    getBalance()    
    
    
  }, [Data]);

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
    establishConnection();
    console.log('a');
      if(Data != null)
      {
        if(Data.Users.public_key != null)
        {
            
            let userkey = Data.Users.private_key.split(',')
            let secretKeyUser = Uint8Array.from(userkey);

            
            let Userkeypair = Keypair.fromSecretKey(secretKeyUser);

            await createUsdt(Userkeypair);


            console.log(Userkeypair.publicKey.toBase58())

            let balance = await connection.getBalance(Userkeypair.publicKey);
            let balance1=  balance/LAMPORTS_PER_SOL;
            SetBalance(balance1)
        }
        
      }
      
 }


  async function genererateAccount()
  {
    console.log('a');
    establishConnection();
    const baseAccount = Keypair.generate();

   



   

   let programId=new solanaWeb3.PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
    console.log(CONTRACT_KEY)
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



        let mint = new PublicKey('Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB');

    

      }

  }


  async function createUsdt(splaccount)
  {
    window.Buffer = buffer.Buffer;
    let secretKeyAdmin = Uint8Array.from(CONTRACT_KEY);
    let Adminkeypair = Keypair.fromSecretKey(secretKeyAdmin);


    

    let mint = new PublicKey('faSGkHe2xcGko8fmE5fQNSMdwicNiZdLkYHou6f4EgS');

    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      splaccount,
      mint,
      splaccount.publicKey
    )

    

    /*
   let signature = await transfer(
      connection,
      splaccount,
      fromTokenAccount.address,
      toTokenAccount.address,
      splaccount,
      5000000000
  );

  await connection.confirmTransaction(signature);

    */
    console.log(fromTokenAccount.address.toBase58());

   

    
    

  }

  






 async function UpdateUser(user_id,private_key,public_key)
  {
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
          <a href="profile.html"><img src={face2} className="rounded-circle" alt="author-image" /></a>
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
           
            {/* Features End */}
            {/* Categorie */}

            {Data.Users.public_key == null ?
            <button onClick = {()=> {ButtonClicked()}}>Click</button>
            :
            <>
           
           <div className='text-center mt-1'> 
              Deposit Your Fund (SOL USDT Network)
           </div>    
          
<div style={{ height: "auto", margin: "0 auto", maxWidth: 150, width: "100%" }}>
    <QRCode
    size={256}
    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
    value={Data.Users.public_key}
    viewBox={`0 0 256 256`}
    />
</div>

  <div className='text-center mt-1'> 
  <h6>{Data.Users.public_key}</h6> 
   </div>
            </>
            }


            
           
           
          </div>
        </div>    
      </div>
    </div>    
    {/* Page Content End*/}
    
    {/* Theme Color Settings */}
   
    
  </div>

);

}