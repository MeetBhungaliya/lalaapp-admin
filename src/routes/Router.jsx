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
import LetterSounds from "@/pages/dashboard/LetterSounds";
import PhonemeIsolation from "@/pages/dashboard/PhonemeIsolation/PhonemeIsolation";
import RhymingWords from "@/pages/dashboard/RhymingWords/RhymingWords";
import SegmentingWords from "@/pages/dashboard/SegmentingWords/SegmentingWords";
import Statistics from "@/pages/dashboard/Statistics/Statistics";
import Subscriptions from "@/pages/dashboard/Subscriptions/Subscriptions";
import Users from "@/pages/dashboard/Users/Users";
import WordPronounces from "@/pages/dashboard/WordPronounces";
import BlendingLetterSounds from "@/pages/dashboard/⁠BlendingLetterSounds/⁠BlendingLetterSounds";
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
                {
                  path: "users",
                  element: <Users />,
                },
                {
                  path: "words",
                  children: [
                    {
                      path: "letter-sounds",
                      element: <LetterSounds />,
                    },
                    {
                      path: "word-pronounces",
                      element: <WordPronounces />,
                    },
                    {
                      path: "rhyming",
                      element: <RhymingWords />,
                    },
                    {
                      path: "phoneme_isolation",
                      element: <PhonemeIsolation />,
                    },
                    {
                      path: "blending_letter_sounds",
                      element: <BlendingLetterSounds />,
                    },
                    {
                      path: "segmenting_words",
                      element: <SegmentingWords />,
                    }
                  ],
                },
                {
                  path: "subscriptions",
                  element: <Subscriptions />,
                }
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
