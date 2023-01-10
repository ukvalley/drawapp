import React, { useRef, useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default function Navbar({handleNavbarOutclick})
{

    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const menuRef     = useRef(null);
    const menuBtnRef  = useRef(null);

    const handleDropdown = (e) => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setIsDropdownOpen(false);
            handleNavbarOutclick()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside, true);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside, true);
        };
    }, []);




return(
    <div ref={menuRef} className="sidebar show">
    <div className="author-box">
      <div className="dz-media">
        <img src="assets/images/author/pic1.png" className="rounded-circle" alt="author-image" />
      </div>
      <div className="dz-info">
        <span>Good Morning</span>
        <h5 className="name">Henry Kanwil</h5>
      </div>
    </div>
    <ul className="nav navbar-nav">	
      <li className="nav-label">Main Menu</li>
      <li><a className="nav-link" href="welcome.html">
          <span className="dz-icon bg-red light">
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.4" d="M11.776 21.8374C9.49294 20.4273 7.37064 18.7645 5.44791 16.8796C4.09052 15.5338 3.05388 13.8905 2.41718 12.0753C1.27955 8.53523 2.60383 4.48948 6.30113 3.2884C8.25264 2.67553 10.3751 3.05175 12.0071 4.29983C13.6397 3.05315 15.7614 2.67705 17.713 3.2884C21.4103 4.48948 22.7435 8.53523 21.6058 12.0753C20.9743 13.8888 19.9438 15.5319 18.5929 16.8796C16.6684 18.7625 14.5463 20.4251 12.2648 21.8374L12.016 22L11.776 21.8374Z" fill="white" />
              <path d="M12.0109 22L11.776 21.8374C9.49013 20.4274 7.36487 18.7647 5.43902 16.8796C4.0752 15.5356 3.03238 13.8922 2.39052 12.0753C1.26177 8.53523 2.58605 4.48948 6.28335 3.2884C8.23486 2.67553 10.3853 3.05204 12.0109 4.31057V22Z" fill="white" />
              <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="white" />
            </svg>
          </span>
          <span>Welcome</span>
        </a></li>
      <li><a className="nav-link" href="index.html">
          <span className="dz-icon bg-pink light">
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.14373 20.7821V17.7152C9.14372 16.9381 9.77567 16.3067 10.5584 16.3018H13.4326C14.2189 16.3018 14.8563 16.9346 14.8563 17.7152V20.7732C14.8562 21.4473 15.404 21.9951 16.0829 22H18.0438C18.9596 22.0023 19.8388 21.6428 20.4872 21.0007C21.1356 20.3586 21.5 19.4868 21.5 18.5775V9.86585C21.5 9.13139 21.1721 8.43471 20.6046 7.9635L13.943 2.67427C12.7785 1.74912 11.1154 1.77901 9.98539 2.74538L3.46701 7.9635C2.87274 8.42082 2.51755 9.11956 2.5 9.86585V18.5686C2.5 20.4637 4.04738 22 5.95617 22H7.87229C8.19917 22.0023 8.51349 21.8751 8.74547 21.6464C8.97746 21.4178 9.10793 21.1067 9.10792 20.7821H9.14373Z" fill="#130F26" />
            </svg>
          </span>
          <span>Home</span>
        </a></li>
      <li><a className="nav-link" href="pages.html">
          <span className="dz-icon bg-orange light">
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={20} height={20} viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
              <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                <polygon points="0 0 24 0 24 24 0 24" />
                <path d="M12.9336061,16.072447 L19.36,10.9564761 L19.5181585,10.8312381 C20.1676248,10.3169571 20.2772143,9.3735535 19.7629333,8.72408713 C19.6917232,8.63415859 19.6104327,8.55269514 19.5206557,8.48129411 L12.9336854,3.24257445 C12.3871201,2.80788259 11.6128799,2.80788259 11.0663146,3.24257445 L4.47482784,8.48488609 C3.82645598,9.00054628 3.71887192,9.94418071 4.23453211,10.5925526 C4.30500305,10.6811601 4.38527899,10.7615046 4.47382636,10.8320511 L4.63,10.9564761 L11.0659024,16.0730648 C11.6126744,16.5077525 12.3871218,16.5074963 12.9336061,16.072447 Z" fill="#fff" fillRule="nonzero" />
                <path d="M11.0563554,18.6706981 L5.33593024,14.122919 C4.94553994,13.8125559 4.37746707,13.8774308 4.06710397,14.2678211 C4.06471678,14.2708238 4.06234874,14.2738418 4.06,14.2768747 L4.06,14.2768747 C3.75257288,14.6738539 3.82516916,15.244888 4.22214834,15.5523151 C4.22358765,15.5534297 4.2250303,15.55454 4.22647627,15.555646 L11.0872776,20.8031356 C11.6250734,21.2144692 12.371757,21.2145375 12.909628,20.8033023 L19.7677785,15.559828 C20.1693192,15.2528257 20.2459576,14.6784381 19.9389553,14.2768974 C19.9376429,14.2751809 19.9363245,14.2734691 19.935,14.2717619 L19.935,14.2717619 C19.6266937,13.8743807 19.0546209,13.8021712 18.6572397,14.1104775 C18.654352,14.112718 18.6514778,14.1149757 18.6486172,14.1172508 L12.9235044,18.6705218 C12.377022,19.1051477 11.6029199,19.1052208 11.0563554,18.6706981 Z" fill="#fff" opacity="0.5" />
              </g>
            </svg>
          </span>
          <span>Pages</span>
        </a></li>
      <li><a className="nav-link" href="ui-components.html">
          <span className="dz-icon bg-skyblue light">
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={18} height={18} viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
              <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                <rect x={0} y={0} width={24} height={24} />
                <rect fill="#00aeff" x={4} y={4} width={7} height={7} rx="1.5" />
                <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#fff" opacity="0.5" />
              </g>
            </svg>
          </span>
          <span>Components</span>
        </a></li>
      <li><a className="nav-link" href="notification.html">
          <span className="dz-icon bg-green light">
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={18} height={18} viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
              <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                <path d="M17,12 L18.5,12 C19.3284271,12 20,12.6715729 20,13.5 C20,14.3284271 19.3284271,15 18.5,15 L5.5,15 C4.67157288,15 4,14.3284271 4,13.5 C4,12.6715729 4.67157288,12 5.5,12 L7,12 L7.5582739,6.97553494 C7.80974924,4.71225688 9.72279394,3 12,3 C14.2772061,3 16.1902508,4.71225688 16.4417261,6.97553494 L17,12 Z" fill="#fff" />
                <rect fill="#fff" opacity="0.3" x={10} y={16} width={4} height={4} rx={2} />
              </g>
            </svg>
          </span>
          <span>Notification</span>
          <span className="badge badge-circle badge-danger">1</span>
        </a></li>
      <li><a className="nav-link" href="profile.html">
          <span className="dz-icon bg-yellow light">
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={18} height={18} viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
              <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                <polygon points="0 0 24 0 24 24 0 24" />
                <path d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z" fill="#fff" fillRule="nonzero" opacity="0.3" />
                <path d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z" fill="#fff" fillRule="nonzero" />
              </g>
            </svg>
          </span>
          <span>Profile</span>
        </a></li>
      <li><a className="nav-link" href="messages.html">
          <span className="dz-icon bg-skyblue light">
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={18} height={18} viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
              <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                <rect x={0} y={0} width={24} height={24} />
                <path d="M21.9999843,15.009808 L22.0249378,15 L22.0249378,19.5857864 C22.0249378,20.1380712 21.5772226,20.5857864 21.0249378,20.5857864 C20.7597213,20.5857864 20.5053674,20.4804296 20.317831,20.2928932 L18.0249378,18 L6,18 C4.34314575,18 3,16.6568542 3,15 L3,6 C3,4.34314575 4.34314575,3 6,3 L19,3 C20.6568542,3 22,4.34314575 22,6 L22,15 C22,15.0032706 21.9999948,15.0065399 21.9999843,15.009808 Z" fill="#fff" opacity="0.3" />
                <path d="M7.5,12 C6.67157288,12 6,11.3284271 6,10.5 C6,9.67157288 6.67157288,9 7.5,9 C8.32842712,9 9,9.67157288 9,10.5 C9,11.3284271 8.32842712,12 7.5,12 Z M12.5,12 C11.6715729,12 11,11.3284271 11,10.5 C11,9.67157288 11.6715729,9 12.5,9 C13.3284271,9 14,9.67157288 14,10.5 C14,11.3284271 13.3284271,12 12.5,12 Z M17.5,12 C16.6715729,12 16,11.3284271 16,10.5 C16,9.67157288 16.6715729,9 17.5,9 C18.3284271,9 19,9.67157288 19,10.5 C19,11.3284271 18.3284271,12 17.5,12 Z" fill="#fff" opacity="0.3" />
              </g>
            </svg>
          </span>
          <span>Chat</span>
          <span className="badge badge-circle badge-info">5</span>
        </a></li>
      <li><a className="nav-link" href="onboading.html">
          <span className="dz-icon bg-red light">
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={18} height={18} viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
              <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                <rect x={0} y={0} width={24} height={24} />
                <path d="M14.0069431,7.00607258 C13.4546584,7.00607258 13.0069431,6.55855153 13.0069431,6.00650634 C13.0069431,5.45446114 13.4546584,5.00694009 14.0069431,5.00694009 L15.0069431,5.00694009 C17.2160821,5.00694009 19.0069431,6.7970243 19.0069431,9.00520507 L19.0069431,15.001735 C19.0069431,17.2099158 17.2160821,19 15.0069431,19 L3.00694311,19 C0.797804106,19 -0.993056895,17.2099158 -0.993056895,15.001735 L-0.993056895,8.99826498 C-0.993056895,6.7900842 0.797804106,5 3.00694311,5 L4.00694793,5 C4.55923268,5 5.00694793,5.44752105 5.00694793,5.99956624 C5.00694793,6.55161144 4.55923268,6.99913249 4.00694793,6.99913249 L3.00694311,6.99913249 C1.90237361,6.99913249 1.00694311,7.89417459 1.00694311,8.99826498 L1.00694311,15.001735 C1.00694311,16.1058254 1.90237361,17.0008675 3.00694311,17.0008675 L15.0069431,17.0008675 C16.1115126,17.0008675 17.0069431,16.1058254 17.0069431,15.001735 L17.0069431,9.00520507 C17.0069431,7.90111468 16.1115126,7.00607258 15.0069431,7.00607258 L14.0069431,7.00607258 Z" fill="#fff" fillRule="nonzero" opacity="0.3" transform="translate(9.006943, 12.000000) scale(-1, 1) rotate(-90.000000) translate(-9.006943, -12.000000) " />
                <rect fill="#ff4db8" opacity="0.3" transform="translate(14.000000, 12.000000) rotate(-270.000000) translate(-14.000000, -12.000000) " x={13} y={6} width={2} height={12} rx={1} />
                <path d="M21.7928932,9.79289322 C22.1834175,9.40236893 22.8165825,9.40236893 23.2071068,9.79289322 C23.5976311,10.1834175 23.5976311,10.8165825 23.2071068,11.2071068 L20.2071068,14.2071068 C19.8165825,14.5976311 19.1834175,14.5976311 18.7928932,14.2071068 L15.7928932,11.2071068 C15.4023689,10.8165825 15.4023689,10.1834175 15.7928932,9.79289322 C16.1834175,9.40236893 16.8165825,9.40236893 17.2071068,9.79289322 L19.5,12.0857864 L21.7928932,9.79289322 Z" fill="#fff" fillRule="nonzero" transform="translate(19.500000, 12.000000) rotate(-90.000000) translate(-19.500000, -12.000000) " />
              </g>
            </svg>
          </span>
          <span>Logout</span>
        </a></li>
      <li className="nav-label">Settings</li>
      <li className="nav-color" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">
        <a className="nav-link">
          <span className="dz-icon bg-blue light">                        
            <i className="fa-solid fa-palette" />
          </span>					
          <span>Highlights</span>					
        </a>
      </li>
      <li>
        <div className="mode">
          <span className="dz-icon bg-green light">
            <i className="fa-solid fa-moon" />
          </span>					
          <span>Dark Mode</span>
          <div className="custom-switch">
            <input type="checkbox" className="switch-input theme-btn" id="toggle-dark-menu" />
            <label className="custom-switch-label" htmlFor="toggle-dark-menu" />
          </div>
        </div>
      </li>
    </ul>
    <div className="sidebar-bottom">
      <h6 className="name">Jobie - Job Portal</h6>
      <p>App Version 1.0</p>
    </div>
  </div>
);

}