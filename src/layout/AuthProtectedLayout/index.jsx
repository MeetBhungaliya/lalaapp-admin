import Loading from "@/components/common/Loading";
import { useAuthStore } from "@/hooks/use-auth";
import { Navigate, Outlet } from "react-router";

const AuthProtectedLayout = () => {
  const authState = useAuthStore();

  if (authState.isLoading) {
    return (
      <div className="w-full h-dvh flex justify-center items-center">
        <Loading className="animate-spin" />
      </div>
    );
  }

  if (authState.isAuthenticated) {
    return <Navigate to="/statistics" replace />;
  }

  return <Outlet />;
};

export default AuthProtectedLayout;
