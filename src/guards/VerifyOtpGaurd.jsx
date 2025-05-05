import { Navigate, Outlet, useLocation } from "react-router";

const VerifyOtpGaurd = () => {
    const { state } = useLocation();
    if(state?.email){
        return <Outlet />
    }else{
        return <Navigate to={'/forgot_password'}/>
    }
}

export default VerifyOtpGaurd;
