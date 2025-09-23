/* eslint-disable react/prop-types */
import { useCallback, useContext } from 'react';
import {NavLink} from 'react-router-dom';
import './Sidebar.css';
import logodark from './../assets/images/logodark.png';
import logolight from './../assets/images/logolight.png';
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import {ThemeContext} from '../context/ThemeContextProvider';
import { MdDashboard } from "react-icons/md";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { useDispatch} from 'react-redux';
import { userLogin } from '../store/actions/productActions';
import { userSignOut } from '../services/authService';


function SellerSideBar({isSidebarCollapsed}) {
    const { themeName } = useContext(ThemeContext);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const handleLogout =useCallback( ()=>{
    //write the function for logout
    const removeUser = () =>{
      userSignOut()
      .then((res)=>{
        console.log("LoggedOut",res)
        dispatch(userLogin({isLoggedIn:false}))
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
          <span className='w-4 p-4'>
            {
              themeName === 'light' ?
              (
                <img src={logolight} alt="logo" />
              ) 
              :
              (
                <img src={logodark} alt="logo" />
              )
            }
          </span>
        <NavLink to="/seller" className="a sidebar-item">
        <MdDashboard size={24}/>
        {
          !isSidebarCollapsed &&
          <span className="sidebar-text">Dashboard</span>
        }
        </NavLink>

        <NavLink to="/seller/myProducts" className="a sidebar-item">
        <GiCardboardBoxClosed size={25}/>
        {
          !isSidebarCollapsed &&
          <span className="sidebar-text">My Products</span>
        }
        </NavLink>
        </div>
        
        
        <span className='sidebar-item logout' onClick={handleLogout}>
        <MdLogout  size={24} />
        {
          !isSidebarCollapsed &&
          <span className="sidebar-text">Logout</span>
        }
        </span>
    </div>      
  )
}

export default SellerSideBar