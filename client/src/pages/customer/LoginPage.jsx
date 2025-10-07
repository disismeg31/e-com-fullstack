import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import SignIn from './../../components/SignIn';
import SignUp from './../../components/SignUp';
function LoginPage() {
 const [isSignIn, setIsSignIn] = useState(true);
const { isLoggedIn, role } = useSelector(state => state.auth.user);

 const handleSwich =()=>{
    setIsSignIn(!isSignIn)
 }

 // Redirect logged-in users to dashboard based on role
  if (isLoggedIn) {
    if (role === 'customer') return <Navigate to="/customer/dashboard" replace />;
    if (role === 'seller') return <Navigate to="/seller/myProducts" replace />;
    if (role === 'admin') return <Navigate to="/admin/dashboard" replace />;
  }
    return(   
            <>
            <div className="flex flex-col  justify-center items-center h-screen w-full">
                {
                    isSignIn ? 
                    <SignIn onSwitch={handleSwich} /> 
                    :
                    <SignUp onSwitch={handleSwich} />
                }
            </div>
            </>
    )
}

export default LoginPage;
