import { Outlet,Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
function ProtectedRoutes() {
  const isLoggedIn = useSelector(state=>state.products.user?.isLoggedIn);
  const role = useSelector(state=>state.products.user?.role);
  console.log("ProtectedAdminRoute →", { isLoggedIn, role });
  return (isLoggedIn && role === "customer") ? <Outlet/> : <Navigate to='/'/>
}

export default ProtectedRoutes