import { Outlet,Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
function ProtectedAdminRoute() {
  const isLoggedIn = useSelector(state=>state.auth.user?.isLoggedIn);
  const role = useSelector(state=>state.auth.user?.role);
  console.log("ProtectedAdminRoute →", { isLoggedIn, role });
  return  (isLoggedIn && role === "admin") ? <Outlet/> : <Navigate to='/'/>
}

export default ProtectedAdminRoute