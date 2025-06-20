import { Outlet,Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
function ProtectedSellerRoute() {
  const isLoggedIn = useSelector(state=>state.products.user?.isLoggedIn);
  const role = useSelector(state=>state.products.user?.role);
  console.log("ProtectedSellerRoute →", { isLoggedIn, role });
  return  (isLoggedIn && role === "seller") ? <Outlet/> : <Navigate to='/'/>  
}

export default ProtectedSellerRoute