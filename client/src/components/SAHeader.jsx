import {NavLink} from 'react-router-dom';
import { useContext } from 'react';
import {ThemeContext} from '../context/ThemeContextProvider';
// import { SearchContext } from "../context/SearchContextProvider";
import './SAHeader.css'; 
import { IoIosCart } from "react-icons/io";
import { MdSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';

function SAHeader() {
    const {themeName,updateTheme} = useContext(ThemeContext)
  return (
    <div className={`header-container sticky top-0 z-1000 flex justify-center w-full rounded-md p-10 box-border ${themeName}`}> 
        {/* <SearchBar /> */}
        <div className='icons-container'>
        
        <span className='rounded-container-style' onClick={updateTheme} >
          {
            themeName ==='light'? 
              (
              <MdSunny className='icon' size={23} />
              )
               :
              (
              <IoMdMoon className='icon' size={23} />
              )   
          }
          </span>
        
        <NavLink to='/seller/sellerProfile' className='rounded-container-style'>
          <FaUserCircle  className='icon' size={23} />
        </NavLink>
        </div>  
    </div>
  )
}

export default SAHeader