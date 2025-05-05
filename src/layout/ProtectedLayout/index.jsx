import { Navigate, Outlet } from "react-router";

const ProtectedLayout = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />
  }

  return <Outlet />;
};

export default ProtectedLayout;
