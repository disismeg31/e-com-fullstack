import {useRef,useState,useCallback} from 'react';
import { useNavigate } from "react-router-dom";
import Btn from '../../components/Btn.jsx';
import './Login.css';
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
// import axios from 'axios';
import {Alert,Snackbar} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../store/actions/productActions.js';
function Login() {
    const [isVisible,setIsVisible] = useState(false);
    const [open, setOpen] = useState(false);
    // const [errorOpen,setErrorOpen]= useState(false);
    const usernameInputElement = useRef();
    const passwordInputElement = useRef();
    const navigate = useNavigate();
    const dispatch =  useDispatch()

    const handleLoginClick = useCallback(() => {
         const email = usernameInputElement.current.value;
         const password = passwordInputElement.current.value;
        if(password === "123"){
            let role = "customer";
            if(email.includes("@admin")){
                role = "admin";
            }
            else if(email.includes("@seller")){
                role = "seller"
            }
            // navigate("/home"); // Navigate to the home page
            dispatch(userLogin({isLoggedIn:true,role}));
            setOpen(true);
            setTimeout(() => { 
                if (role === "admin") {
                        navigate("/admin");
                } 
                else if (role === "seller") {
                        navigate("/seller");
                } else {
                        navigate("/home");
                }
                // navigate("/home"); // Navigate after showing the alert
            }, 1000); // 2-second delay
            
            console.log(usernameInputElement.current.value,passwordInputElement.current.value)
        }
        else{
            alert('incorrect username👤 & password🔑');
            usernameInputElement.current.value="";
            passwordInputElement.current.value="";
            // setErrorOpen(true)
        }  
    },[navigate, dispatch]);
    console.log("login");
    return(
            <div className='main-container' >
            <div className="login-wrapper">
            <div className="head-btn">
            <h1 className='login-title'>LOGIN</h1>
            <input className='input-box' ref={usernameInputElement}  name='username'  autoComplete="off"  type="text" placeholder="username"   />
            <div className="psw">
            <input className='input-box psw-inp' ref={passwordInputElement} name='password'   type={isVisible ? "text" :"password"} placeholder="password"  />
            {isVisible?<span className='psw-icon' onClick={()=>setIsVisible((i)=>!i)}><FaRegEyeSlash/></span>:<span className='psw-icon' onClick={()=>setIsVisible((i)=>!i)}><FaRegEye/></span>}
            </div>
            <Btn label="Login" onClick={handleLoginClick}/>
            </div>
            <div className='forgot'>
            <span className='forgot-password' >forgot password?</span>
            </div>
            </div>  
            <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert icon={<CheckIcon fontSize="inherit" />}  severity="success">
                 Login successful.
                </Alert>
            </Snackbar> 
            
            </div>
    )
}

export default Login;
