/* eslint-disable react/prop-types */
import { useCallback, useContext } from 'react';
import {NavLink} from 'react-router-dom';
import './Sidebar.css';
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import {ThemeContext} from '../context/ThemeContextProvider';
import { MdDashboard } from "react-icons/md";
import { useDispatch} from 'react-redux';
import { userLogin } from '../store/actions/productActions';
import { userSignOut } from '../services/authService';

function Sidebar({isSidebarCollapsed}) {
    const { themeName } = useContext(ThemeContext);
    const dispatch = useDispatch();
    const nav = useNavigate()
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
        <NavLink to="/home" className="a sidebar-item">
        <MdDashboard size={25}/>
        {
          !isSidebarCollapsed &&
          <span className="sidebar-text">Dashboard</span>
        }
        </NavLink>
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

export default Sidebar