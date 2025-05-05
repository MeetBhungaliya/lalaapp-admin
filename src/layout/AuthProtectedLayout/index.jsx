import { Navigate, Outlet } from "react-router";

const AuthProtectedLayout = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/users" />
  }

  return <Outlet />;
};

export default AuthProtectedLayout;
