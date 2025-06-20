import { useContext } from 'react';
import {ThemeContext} from '../context/ThemeContextProvider'
import './Footer.css'
function Footer(){
    const {themeName} = useContext(ThemeContext)
    
    return(
        <>
        <div className={`footer-container ${themeName}`} >
        <p className='para'>@Copyright2025</p>
        </div>
        </>
    )
}
export default Footer;