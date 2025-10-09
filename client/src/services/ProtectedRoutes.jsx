import { Outlet,Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
function ProtectedRoutes() {
  const isLoggedIn = useSelector(state=>state.auth.user?.isLoggedIn);
  const role = useSelector(state=>state.auth.user?.role);
    const isStatus = useSelector(state=>state.auth.user?.status)
  
  console.log("ProtectedAdminRoute →", { isLoggedIn, role, isStatus});
  return (isLoggedIn && role === "customer") ? <Outlet/> : <Navigate to='/'/>
}

export default ProtectedRoutes