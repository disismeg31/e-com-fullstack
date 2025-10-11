/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, logout } from "./../store/actions/authActions";
import { checkSession } from "./authService";
function SessionProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    checkSession()
      .then((data) => {
        if (data.authenticated) {
          dispatch(
            setUser({
              isLoggedIn: true,
              role: data.user?.role,
              status:data.user?.status,
              id:data.user?.id,
              name:data.user?.name,
            })
          );
        } else {
          dispatch(logout());
        }
      })
      .catch((err) => {
        console.error("check-session error:", err);
        dispatch(logout());
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);
  if (loading) {
    // show a spinner or blank screen while session is checked
    return <div>Loading...</div>;
  }

  return children;
}

export default SessionProvider;
