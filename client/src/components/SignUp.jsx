/* eslint-disable react/prop-types */
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { userLogin } from "./../store/actions/productActions.js";
import Btn from "./Btn.jsx";
import { Alert, Snackbar } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

function SignUp({onSwitch}) {
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const roles = ["customer", "seller"];
  // const [errorOpen,setErrorOpen]= useState(false);
  const [formData,setFormData] = useState({
    name:"",
    email:"",
    password:"",
    role:""
  })

  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const handleInputChange=(e)=>{
    const {name,value} = e.target;
    setFormData((f)=>({...f,[name]:value}))
  }

  const handleSignUpClick =  (e) => {
      e.preventDefault();
      console.log(formData);
      setFormData({
        name:"",
        email:"",
        password:"",
        role:""
      })
    
    }
     
  console.log("SignIn");
  return (
    <>
      <div className="login-wrapper border-2 border-[#3a395a] w-[400px] max-w-xs sm:max-w-sm mx-auto p-6 rounded-md">
        <div className="head-btn flex flex-col flex-wrap justify-center">
          <div className="flex flex-col">
            <p className="mx-1 my-2 !text-[#3a395a] text-3xl">Sign Up</p>
            <p className="mx-1 my-2 text-sm font-medium !text-[#3a395a] ">
              Already have an account?{" "}
              <span onClick={onSwitch} className="text-[#e65d5d] font-medium hover:font-semibold hover:cursor-pointer hover:underline">
                signin
              </span>
            </p>
          </div>

          <form onSubmit={handleSignUpClick}>
          <div className="w-full flex flex-col justify-center">
            <div className="w-full flex items-center">
              <input
                className="w-full h-11 mx-1 my-2 py-0 px-2.5 text-base  text-[#3a395a]  border-b-2 border-[#3a395a] placeholder:!text-[#3a395a] focus:outline-hidden focus:bg-none"
                value={formData.name}
                name="name"
                autoComplete="off"
                type="text"
                placeholder="name"
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full flex items-center">
              <input
                className="w-full h-11 mx-1 my-2 py-0 px-2.5 text-base  text-[#3a395a]  border-b-2 border-[#3a395a] placeholder:!text-[#3a395a] focus:outline-hidden focus:bg-none"
                value={formData.email}
                name="email"
                autoComplete="off"
                type="text"
                placeholder="username / email"
                onChange={handleInputChange}
              />
            </div>

            <div className="w-full relative flex items-center">
              <input
                className="w-full mx-1 my-2 h-11 py-0 px-2.5 text-base text-[#3a395a] border-b-2 border-[#3a395a] placeholder:!text-[#3a395a] placeholder:opacity-100 focus:outline-hidden focus:bg-none"
                value={formData.password}
                name="password"
                type={isVisible ? "text" : "password"}
                placeholder="password"
                onChange={handleInputChange}
              />
              {isVisible ? (
                <span
                  className="psw-icon absolute right-5 top-[55%] z-1 text-[#3a395a] cursor-pointer"
                  onClick={() => setIsVisible((i) => !i)}
                >
                  <FaRegEyeSlash />
                </span>
              ) : (
                <span
                  className="psw-icon absolute right-5 top-[55%] z-1 text-[#3a395a] cursor-pointer"
                  onClick={() => setIsVisible((i) => !i)}
                >
                  <FaRegEye />
                </span>
              )}
            </div>
            <div className="forgot flex justify-end items-end py-0">
              <span className="forgot-password text-[#3a395a] font-light underline cursor-pointer text-xs pb-1 hover:font-medium">
                forgot password?
              </span>
            </div>

            <div className=" w-full flex items-center relative">
              <select 
                className="h-11 w-full mx-1 my-2 py-0 px-2 bg-[#dfeed3] text-[#3a395a] text-base border-b-2 border-[#3a395a] focus:outline-0 placeholder:text-[#3a395a] appearance-none"
                placeholder = "Select Role"
                name="role"
                value={formData.role}
                onChange={(e)=>{setFormData((f)=>({...f,[e.target.name] : e.target.value}))}}
              >
                <option value="" hidden>Select role</option>
                {roles.map((role)=>(
                  <option key={role} value={role}>{role[0].toUpperCase() + role.slice(1)}</option>
                ))}
              </select>
               
                 {/* custom arrow */}
                <svg
                  className="w-3 h-3 absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#3a395a]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              
            </div>

            <div className="w-full flex justify-center items-center my-1">
              <Btn type="submit" label="Create Account-" onClick={handleSignUpClick} />
            </div>
          </div>
          </form>

        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Registeratin successful.
        </Alert>
      </Snackbar>
    </>
  );
}

export default SignUp;
