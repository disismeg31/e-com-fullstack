/* eslint-disable react/prop-types */
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./../store/actions/authActions.js";
import Btn from "./Btn.jsx";
import { userSignIn } from "./../services/authService.js";
import "./SignIn.css";
import { Alert, Snackbar } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

function SignIn({ onSwitch }) {
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [errMessage,setErrMessage] = useState("")
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const [errorOpen, setErrorOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignInClick = useCallback(
    (data) => {
      const getUser = () => {
        userSignIn(data)
          .then((user) => {
            if (user.status === true) {
              console.log("Login Success ✅:", user.payload.role);
              // 1. Dispatch Redux action
               dispatch(setUser({ isLoggedIn: true, role: user.payload.role }));
              //  2. Navigate based on role
              setTimeout(() => {
                if (user.payload.role === "admin") navigate("/admin");
                else if (user.payload.role === "seller") navigate("/seller");
                else navigate("/home");
              }, 1000);
              //  3. Show snackbar
              setOpen(true);
            } else {
              console.log("Login failed 🔴:", user);
            }
          })
          .catch((err) => {
            console.log("Error while Signing in", err);
            const errMsg = err?.message || "Login Failed"
            setErrMessage(errMsg)
            setErrorOpen(true);
          });
      };
      getUser();
      reset();
    },
    [reset, dispatch, navigate]
  );
  console.log("login");

  return (
    <>
      <div className="login-wrapper border-2 border-[#3a395a] w-[400px]  max-w-xs sm:max-w-sm  mx-auto p-6 rounded-sm">
        <div className="head-btn flex flex-col justify-center">
          <div className="flex flex-col">
            <p className="mx-1 my-2 !text-[#3a395a] text-3xl">Sign In</p>
            <p className="mx-1 my-2 text-sm font-medium !text-[#3a395a] ">
              Don&apos;t have an account?{" "}
              <span
                onClick={onSwitch}
                className="text-[#e65d5d] font-medium hover:font-semibold hover:cursor-pointer hover:underline"
              >
                signup
              </span>
            </p>
          </div>
          {/* bg-[#c5c5c554] - inside of input color */}
          <form onSubmit={handleSubmit(handleSignInClick)}>
            <div className="w-full flex flex-col justify-center">
              <div className="w-full flex items-center">
                <input
                  {...register("email", {
                    required: "Username or email is required !",
                    minLength: {
                      value: 3,
                      message:
                        "Username or email must be at least 3 characters",
                    },
                    maxLength: {
                      value: 40,
                      message: "Username or email must be 40 characters",
                    },
                  })}
                  className="w-full h-11 mx-1 my-2 py-0 px-2.5 text-base  text-[#3a395a]  border-b-2 border-[#3a395a] placeholder:!text-[#3a395a] focus:outline-hidden focus:bg-none"
                  autoComplete="off"
                  type="text"
                  placeholder="Username / Email"
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
                  {...register("password", {
                    required: "Password is required!",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    // maxLength: { value: 8, message: "Password must be 8 characters" },
                    pattern: {
                      value:
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                      message:
                        "Password must include letters, numbers & symbols",
                    },
                  })}
                  className="w-full mx-1 my-2 h-11 py-0 px-2.5 text-base text-[#3a395a] border-b-2 border-[#3a395a] placeholder:!text-[#3a395a] placeholder:opacity-100 focus:outline-hidden focus:bg-none"
                  type={isVisible ? "text" : "password"}
                  placeholder="Password"
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
              <div className="for password error message">
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

              <div className="w-full flex justify-center items-center my-1">
                <Btn type="submit" label="Login-" />
                {/* <Btn type="button" label="Login-" onClick={handleSignInClick} /> */}
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
            Login successful.
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

export default SignIn;
