import { Outlet,Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
function ProtectedSellerRoute() {
  const isLoggedIn = useSelector(state=>state.auth.user?.isLoggedIn);
  const role = useSelector(state=>state.auth.user?.role);
   const status = useSelector(state=>state.auth.user?.status)
  console.log("ProtectedSellerRoute →", { isLoggedIn, role ,status});
  return  (isLoggedIn && role === "seller") ? <Outlet/> : <Navigate to='/'/>  
}

export default ProtectedSellerRoute