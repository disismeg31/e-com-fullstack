import { useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "./../store/actions/productActions.js";
import Btn from "./Btn.jsx";
import "./SignIn.css";
import { Alert, Snackbar } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

function SignIn() {
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);
  // const [errorOpen,setErrorOpen]= useState(false);
  const usernameInputElement = useRef();
  const passwordInputElement = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginClick = useCallback(() => {
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
    <div className="main-container flex flex-col flex-wrap justify-center items-center h-[100%]">
      <div className="login-wrapper w-90 p-5 rounded-md">
        <div className="head-btn flex flex-col justify-center items-center">
          <h1 className="login-title m-0 text-[#3C6E71] text-3xl">LOGIN</h1>
          <input
            className="input-box w-60 h-11 m-2 py-0 px-2.5 text-base bg-[#c5c5c554] text-[#3a395a] rounded-md placeholder:text-[#3a395a] focus:outline-hidden focus:bg-none"
            ref={usernameInputElement}
            name="username"
            autoComplete="off"
            type="text"
            placeholder="username"
          />
          <div className="psw relative flex items-center">
            <input
              className="input-box w-60 h-11 m-2 py-0 px-2.5 text-base bg-[#c5c5c554] text-[#3a395a] rounded-md placeholder:text-[#3a395a] focus:outline-hidden focus:bg-none"
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
          <Btn label="Login" onClick={handleLoginClick} />
        </div>
        <div className="forgot flex justify-end items-end py-0 px-10">
          <span className="forgot-password text-[#3a395a] underline cursor-pointer text-sm pb-2.5">forgot password?</span>
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
    </div>
  );
}

export default SignIn;
