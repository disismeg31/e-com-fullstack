/* eslint-disable react/prop-types */
import { useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { userLogin } from "./../store/actions/productActions.js";
import Btn from "./Btn.jsx";
import "./SignIn.css";
import { Alert, Snackbar } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

function SignIn({onSwitch}) {
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);
  // const [errorOpen,setErrorOpen]= useState(false);
  const usernameInputElement = useRef();
  const passwordInputElement = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignInClick = useCallback(() => {
    const email = usernameInputElement.current.value;
    const password = passwordInputElement.current.value;
    if (password === "123") {
      let role = "customer";
      if (email.includes("@admin")) {
        role = "admin";
      } else if (email.includes("@seller")) {
        role = "seller";
      }
      // navigate("/home"); // Navigate to the home page
      dispatch(userLogin({ isLoggedIn: true, role }));
      setOpen(true);
      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin");
        } else if (role === "seller") {
          navigate("/seller");
        } else {
          navigate("/home");
        }
        // navigate("/home"); // Navigate after showing the alert
      }, 1000); // 2-second delay

      console.log(
        usernameInputElement.current.value,
        passwordInputElement.current.value
      );
    } else {
      alert("incorrect username👤 & password🔑");
      usernameInputElement.current.value = "";
      passwordInputElement.current.value = "";
      // setErrorOpen(true)
    }
  }, [navigate, dispatch]);
  console.log("login");

  return (
    <>
      <div className="login-wrapper border-2 border-[#3a395a] w-[400px]  max-w-xs sm:max-w-sm  mx-auto p-6 rounded-md">
        <div className="head-btn flex flex-col justify-center">
          <div className="flex flex-col">
            <p className="mx-1 my-2 !text-[#3a395a] text-3xl">Sign In</p>
            <p className="mx-1 my-2 text-sm font-medium !text-[#3a395a] ">Don&apos;t have an account? <span onClick={onSwitch} className="text-[#e65d5d] font-medium hover:font-semibold hover:cursor-pointer hover:underline">signup</span></p>
          </div>
          {/* bg-[#c5c5c554] - inside of input color */}
          <div className="w-full flex flex-col justify-center">
            <div className="w-full flex items-center">
              <input
                className="w-full h-11 mx-1 my-2 py-0 px-2.5 text-base  text-[#3a395a]  border-b-2 border-[#3a395a] placeholder:!text-[#3a395a] focus:outline-hidden focus:bg-none"
                ref={usernameInputElement}
                name="username"
                autoComplete="off"
                type="text"
                placeholder="username"
              />
            </div>

            <div className="w-full relative flex items-center">
              <input
                className="w-full mx-1 my-2 h-11 py-0 px-2.5 text-base text-[#3a395a] border-b-2 border-[#3a395a] placeholder:!text-[#3a395a] placeholder:opacity-100 focus:outline-hidden focus:bg-none"
                ref={passwordInputElement}
                name="password"
                type={isVisible ? "text" : "password"}
                placeholder="password"
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

            <div className="w-full flex justify-center items-center my-1">
              <Btn type="button" label="Login-" onClick={handleSignInClick} />
            </div>

          </div>
            
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Login successful.
        </Alert>
      </Snackbar>
    </>
  );
}

export default SignIn;
