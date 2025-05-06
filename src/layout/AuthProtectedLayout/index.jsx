import { Navigate, Outlet } from "react-router";

const AuthProtectedLayout = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/statistics" />
  }

  return <Outlet />;
};

export default AuthProtectedLayout;
