/* eslint-disable react/prop-types */
import SearchBar from './SearchBar';
import {NavLink} from 'react-router-dom';
import { useContext } from 'react';
import {ThemeContext} from '../context/ThemeContextProvider';
// import { SearchContext } from "../context/SearchContextProvider";
import './Header.css'; 
import { IoIosCart } from "react-icons/io";
import { MdSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';
function Header() {
  const {themeName,updateTheme} = useContext(ThemeContext)
  // using context api
  // const {getTotalCartItem} = useContext(SearchContext)
  // const inCart = getTotalCartItem();

  // using redux
  const cartCount = useSelector(state => state.products?.cartCount || null);
  
  return (
    <div className={`header-container ${themeName}`}> 
        <SearchBar />
        <div className='icons-container'>
        
        <span className='rounded-container-style' onClick={updateTheme} >
          {
            themeName ==='light'? 
              (
              <MdSunny className='icon' size={25} />
              )
               :
              (
              <IoMdMoon className='icon' size={25} />
              )   
          }
          </span>
        <NavLink to='/home/cart' className='rounded-container-style'>
          <IoIosCart className='icon' size={25} />
          {
            cartCount>0?
            <span className='cart-items-badge'>{cartCount}</span>
            :
            null
          }
        </NavLink>
        <NavLink to='/home/profile' className='rounded-container-style'>
          <FaUserCircle  className='icon' size={25} />
        </NavLink>
        </div>  
    </div>
  )
}

export default Header