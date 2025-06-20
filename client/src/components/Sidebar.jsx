/* eslint-disable react/prop-types */
import { useContext } from 'react';
import {NavLink} from 'react-router-dom';
import './Sidebar.css';
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import {ThemeContext} from '../context/ThemeContextProvider';
import { MdDashboard } from "react-icons/md";
import { useDispatch} from 'react-redux';
import { userLogin } from '../store/actions/productActions';

function Sidebar({isSidebarCollapsed}) {
    const { themeName } = useContext(ThemeContext);
    const dispatch = useDispatch();
    const nav = useNavigate()
   const handleLogout =()=>{
    // Remove specific session storage item  
    // sessionStorage.removeItem("userData");
    // sessionStorage.removeItem("Mytoken");

    // Clear all session storage data
    // sessionStorage.clear();
    dispatch(userLogin({isLoggedIn:false}))
    nav('/')
   }
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