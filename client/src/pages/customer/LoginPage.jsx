import SignIn from './../../components/SignIn';
import SignUp from './../../components/SignUp';
function LoginPage() {

    return(   
            <>
            <div className="flex flex-col  justify-center items-center h-screen w-full">
            {/* <div className="flex flex-col bg-[url('/src/assets/images/bg-1.svg')] bg-cover bg-no-repeat bg-center justify-center items-center h-screen w-full"> */}
            {/* <SignIn/> */}
            <SignUp/>
            </div>
            </>
    )
}

export default LoginPage;
