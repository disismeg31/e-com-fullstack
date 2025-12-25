/* eslint-disable react/prop-types */
import { useCallback, useContext } from 'react';
import {NavLink} from 'react-router-dom';
import './Sidebar.css';

import logodark from './../assets/images/logodark.png';
import logolight from './../assets/images/logolight.png';
import logoIconLight from './../assets/images/logoipsum-light-logo.svg';
import logoIconDark from './../assets/images/logoipsum-dark-logo.svg';

import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import {ThemeContext} from '../context/ThemeContextProvider';
import { MdDashboard } from "react-icons/md";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { HiUserAdd } from "react-icons/hi";
import { FaUsers } from "react-icons/fa6";

import { useDispatch} from 'react-redux';
import { logout } from '../store/actions/authActions';
import { userSignOut } from '../services/authService';

function AdminSideBar({isSidebarCollapsed}) {
    const { themeName } = useContext(ThemeContext);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const handleLogout =useCallback( ()=>{
        //write the function for logout
        const removeUser = () =>{
          userSignOut()
          .then((res)=>{
            console.log("LoggedOut",res)
            // dispatch(userLogin({isLoggedIn:false}))
            dispatch(logout())
            nav('/')
          })
        .catch((err)=>{
          console.log("Error while signOut",err.message)
        })
        }
        removeUser();
       },[dispatch,nav])
  return (
    <div className={`sidebar-container ${themeName} ${isSidebarCollapsed ? 'shrunk' : ''}`}>
        <div>
          <span className=''>
                      {
                        themeName === 'light' ?
                        (
                          <>
                          {
                            !isSidebarCollapsed ?
                          <img className='mt-2 h-7 p-0.5' src={logolight} alt="logo" />:
                            <img className='mt-2' src={logoIconLight} alt='logo'/>
                          }
                          </>
                        ) 
                        :
                        (
                          <>
                          {
                            !isSidebarCollapsed ?
                          <img className='mt-2 h-7 p-0.5' src={logodark} alt="logo" />:
                          <img className='mt-2' src={logoIconDark} alt='logo'/>
                          }
                          </>
                        )
                      }
            </span>

        <NavLink to="/admin" className="a sidebar-item">
        <MdDashboard size={24}/>
        {
          !isSidebarCollapsed &&
          <span className="sidebar-text">Dashboard</span>
        }
        </NavLink>

        <NavLink to="/admin/approvedSellers" className="a sidebar-item">
        <FaUsers size={23}/>
        {
          !isSidebarCollapsed &&
          <span className="sidebar-text">Sellers</span>
        }
        </NavLink>

        <NavLink to="/admin/manageProducts" className="a sidebar-item">
        <GiCardboardBoxClosed size={24}/>
        {
          !isSidebarCollapsed &&
          <span className="sidebar-text">Manage</span>
        }
        </NavLink>

        <NavLink to="/admin/sellerRequests" className="a sidebar-item">
        <HiUserAdd size={24}/>
        {
          !isSidebarCollapsed &&
          <span className="sidebar-text">Requests</span>
        }
        </NavLink>

        </div>
        
        
        <span className='sidebar-item logout' onClick={handleLogout}>
        <MdLogout  size={25} />
        {
          !isSidebarCollapsed &&
          <span className="sidebar-text">Logout</span>
        }
        </span>
    </div>      
  )
}

export default AdminSideBar