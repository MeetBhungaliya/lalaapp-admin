import { Navigate, Outlet, useLocation } from "react-router";

const ResetPasswordGuard = () => {
    const { state } = useLocation();
    if(state?.email && state?.verified){
        return <Outlet />
    }else{
        return <Navigate to={'/forgot_password'}/>
    }
}

export default ResetPasswordGuard;
