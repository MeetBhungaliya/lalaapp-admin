import ResetPasswordGuard from "@/guards/ResetPasswordGuard";
import VerifyOtpGaurd from "@/guards/VerifyOtpGaurd";
import AuthProtectedLayout from "@/layout/AuthProtectedLayout";
import Layout from "@/layout/main";
import ProtectedLayout from "@/layout/ProtectedLayout";
import { BASE_PATH } from "@/lib/config";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import Login from "@/pages/auth/Login";
import ResetPassword from "@/pages/auth/ResetPassword";
import VerifyOTP from "@/pages/auth/VerifyOTP";
import Statistics from "@/pages/dashboard/Statistics";
import ErrorPage from "@/pages/error/ErrorPage";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter(
  [
    {
      path: "",
      errorElement: <ErrorPage />,
      children: [
        {
          // element: <ProtectedLayout />,
          children: [
            {
              path: "",
              element: <Layout />,
              children: [
                // {
                //     index: true,
                //     element: <Navigate to="/login" />
                // },
                {
                  path: "statistics",
                  element: <Statistics />,
                },
              ],
            },
          ],
        },
        {
          // element: <AuthProtectedLayout />,
          children: [
            {
              index: true,
              path: "login",
              element: <Login />,
            },
            {
              path: "forgot_password",
              element: <ForgotPassword />,
            },
            {
              path: "verify_otp",
              // element: <VerifyOtpGaurd />,
              children: [
                {
                  index: true,
                  element: <VerifyOTP />,
                },
              ],
            },
            {
              path: "reset_password",
              // element: <ResetPasswordGuard />,
              children: [
                {
                  index: true,
                  element: <ResetPassword />,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  { basename: BASE_PATH }
);

export default router;
