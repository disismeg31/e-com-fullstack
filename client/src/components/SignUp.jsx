/* eslint-disable react/prop-types */
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { userLogin } from "./../store/actions/productActions.js";
import Btn from "./Btn.jsx";
import { Alert, Snackbar } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { userSignUp } from "./../services/authService.js";

function SignUp({onSwitch}) {
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errMessage,setErrMessage] = useState("Registeration unsuccessful.")
  const roles = ["customer", "seller"];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {register, handleSubmit, reset, formState: {errors}} =useForm({
  defaultValues:{
    name:"",
    email:"",
    password:"",
    role:""
  },
  shouldUseNativeValidation: false,
  mode: "onChange",
  criteriaMode: "all",
  })
   
 
  const handleSignUpClick = useCallback(
    (data) => {
      const registerUser = (data) => {
          userSignUp(data)
          .then((res)=>{
               if (res?.status === true) {
                  setOpen(true);
                  onSwitch();
                  navigate("/"); // go straight to home
                } else {
                console.log("Signup failed:", res);
                }
          })
          .catch((err)=>{
            console.log("Error while Signing Up", err);
            const msg = err?.message || "something went wrong";
            setErrMessage(msg);
            setErrorOpen(true);
            // throw err;
          })
      }
      console.log(data);
      registerUser(data);
      reset();
    },[reset,navigate]
  ) 
       
  console.log("SignIn");
  return (
    <>
      <div className="login-wrapper border-2 border-[#3a395a] w-[400px] max-w-xs sm:max-w-sm mx-auto p-6 rounded-sm">
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

          <form onSubmit={handleSubmit(handleSignUpClick)} noValidate>
          <div className="w-full flex flex-col justify-center">
            <div className="w-full flex items-center">
              <input
                className="w-full h-11 mx-1 my-2 py-0 px-2.5 text-base  text-[#3a395a]  border-b-2 border-[#3a395a] placeholder:!text-[#3a395a] focus:outline-hidden focus:bg-none"
                {
                  ...register("name",{
                  required:"name is required !",
                  minLength: { value: 3, message: "Name must be at least 3 characters" },
                  maxLength: { value: 40, message: "Name must be 40 characters" },
                })
                }
                // value={formData.name}
                // name="name"
                autoComplete="off"
                type="text"
                placeholder="Name"
                // onChange={handleInputChange}
              />
            </div>
            <div className="for username error message">
              {errors.name && (
              <p className="!text-[#e65d5d] text-xs mx-1">
              {errors.name?.message}
              </p>
              )}
            </div>

            <div className="w-full flex items-center">
              <input
                className="w-full h-11 mx-1 my-2 py-0 px-2.5 text-base  text-[#3a395a]  border-b-2 border-[#3a395a] placeholder:!text-[#3a395a] focus:outline-hidden focus:bg-none"
                {...register("email",{
                  required:"Email is required!",
                  minLength: { value: 5, message: "Email must be at least 5 characters" },
                  maxLength: { value: 50, message: "Email must be at most 50 characters" },
                  pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address",
                          },
                })}
                // value={formData.email}
                autoComplete="off"
                type="text"
                placeholder="Email"
                // onChange={handleInputChange}
              />
            </div>
            <div className="for username error message">
              {errors.email && (
              <p className="!text-[#e65d5d] text-xs mx-1">
              {errors.email?.message}
              </p>
              )}
            </div>

            <div className="w-full relative flex items-center">
              <input
                className="w-full mx-1 my-2 h-11 py-0 px-2.5 text-base text-[#3a395a] border-b-2 border-[#3a395a] placeholder:!text-[#3a395a] placeholder:opacity-100 focus:outline-hidden focus:bg-none"
                {
                  ...register("password",{
                  required:"Password is required!",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                  maxLength: { value: 8, message: "Password must be 8 characters" },
                  pattern: {
                          value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                          message: "Password must include letters, numbers & symbols"
                  }})
                }
                // value={formData.password}
                // name="password"
                type={isVisible ? "text" : "password"}
                placeholder="Password"
                // onChange={handleInputChange}
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
            <div className="for username error message">
              {errors.password && (
              <p className="!text-[#e65d5d] text-xs mx-1">
              {errors.password?.message}
              </p>
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
                {
                  ...register("role",{
                  required:"Role is required !",
                })
                }
                // name="role"
                // value={formData.role}
                // onChange={(e)=>{setFormData((f)=>({...f,[e.target.name] : e.target.value}))}}
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
            <div className="for username error message">
              {errors.role && (
              <p className="!text-[#e65d5d] text-xs mx-1">
              {errors.role?.message}
              </p>
              )}
            </div>

            <div className="w-full flex justify-center items-center my-1">
              <Btn type="submit" label="Create Account-" />
              {/* <Btn type="submit" label="Create Account-" onClick={handleSignUpClick} /> */}
            </div>
          </div>
          </form>

        </div>
      </div>
       
       {errorOpen ? (
        <Snackbar
          open={errorOpen}
          autoHideDuration={2000}
          onClose={() => setErrorOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            icon={<ErrorOutlineIcon fontSize="inherit" />}
            severity="error"
          >
            {errMessage}
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Registeration successful.
          </Alert>
        </Snackbar>
      )}
       
       
      
      {/* <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Registeratin successful.
        </Alert>
      </Snackbar> */}
    </>
  );
}

export default SignUp;
