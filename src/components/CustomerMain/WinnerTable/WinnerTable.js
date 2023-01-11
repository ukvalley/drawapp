
import PropTypes from 'prop-types';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';


import { LAMPORTS_PER_SOL,Connection, PublicKey , Transaction, sendAndConfirmTransaction,Keypair } from '@solana/web3.js';

import face2 from '../../../images/face2.jpg'
import QRCode from 'react-qr-code';

const solanaWeb3 = require('@solana/web3.js');


export default function WinnerTable({handleNavbar})
{
 
 


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
          <span>Table</span>
          <h2 className="name mb-0">{}</h2>
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
         
          {/* Dashboard Area */}
          
          <div style={{marginTop:"5%"}}>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body text-center" style={{background:"#9a70e5"}}>
                <h5 className="card-title m-b-0" >Winning Table  </h5>
              </div>
              <div className="table-responsive">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                    
                      <th scope="col">Name</th>
                      <th scope="col">Date</th>
                      <th scope="col">Winning</th>
                      <th scope="col">Credicted On</th>
                    </tr>
                  </thead>
                  <tbody className="customtable">
                    <tr>
                      
                      <td>Ashish</td>
                      <td>22/10/2022</td>
                      <td>100000</td>
                      <td>Credicted on</td>
                    </tr>
                
                      
                      
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
           
             

	     
    
           
          
        </div>  
		 
      </div>
    </div>    
    {/* Page Content End*/}
    
    {/* Theme Color Settings */}
   
    
  </div>

);

}