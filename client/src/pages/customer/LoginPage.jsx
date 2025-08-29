import { useState } from 'react';
import SignIn from './../../components/SignIn';
import SignUp from './../../components/SignUp';
function LoginPage() {
 const [isSignIn, setIsSignIn] = useState(true);
 const handleSwich =()=>{
    setIsSignIn(!isSignIn)
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
