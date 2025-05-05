import Loading from "@/components/common/Loading";
import Button from "@/components/custom/Button";
import FormProvider from "@/form/FormProvider";
import OtpField from "@/form/OTPField";
import {
  ARROW_LEFT_ICON,
  LOGIN_IMAGE,
  VERIFY_OTP_ICON,
  VERIFY_OTP_IMAGE,
} from "@/lib/images";
import { OTPSchema } from "@/lib/schema";
import { forgotPassword, verifyOTP } from "@/redux/actions/auth.action";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

const VerifyOTP = () => {
  const actionDispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { state } = useLocation();
  const defaultValues = {
    otp: "",
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(OTPSchema),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (values) => {
    actionDispatch(
      verifyOTP({
        email: state?.email,
        otp: values.otp,
      })
    )
      .unwrap()
      .then(() => {
        navigate("/reset_password", {
          state: {
            verified: true,
            email: state?.email,
          },
        });
      });
  };
  const resendCode = () => {
    actionDispatch(
      forgotPassword({
        email: state?.email,
      })
    )
      .unwrap()
      .then(() => {
        reset({
          otp: "",
        });
      });
  };

  return (
    <section className="min-h-dvh flex flex-col md:flex-row p-6">
      <div className="flex-1 flex flex-col justify-center relative items-center max-md:hidden bg-[#F2F6F6] rounded-[48px]">
        <div>
          <img
            src={VERIFY_OTP_IMAGE}
            alt="VERIFY_OTP_IMAGE"
            className="max-w-[610px]"
          />
        </div>
      </div>
      <div className="flex-1 px-5 sm:px-5 md:px-8 lg:px-10 py-14  bg-white flex items-center relative">
        <div className="max-w-[520px] space-y-4 sm:space-y-5 w-full mx-auto">
          <div className="flex justify-center">
            <div className="size-[120px] bg-ternary rounded-full flex justify-center items-center">
              <img src={VERIFY_OTP_ICON} alt="VERIFY_OTP_ICON" />
            </div>
          </div>
          <div className="text-center space-y-0.5">
            <p className="text-primary text-[26px] font-semibold">
              Authentication
            </p>
            <p className="text-secondary text-base sm:text-lg font-normal  mx-auto text-wrap">
              Enter the verification code sent to your email
            </p>
          </div>
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(onSubmit)}
            className="w-full"
          >
            <div className="flex flex-col gap-6 sm:gap-8">
              <div className=" flex justify-center mt-8 w-full">
                <div className="w-full">
                  <OtpField name="otp" />
                </div>
              </div>
              <div className="max-sm:pt-1">
                <Button
                  disabled={loading}
                  className="text-base max-sm:py-[13.5px] font-semibold sm:text-lg"
                  type="submit"
                  loader={loading}
                >
                  {loading ? <Loading className="text-2xl" /> : "Verify"}
                </Button>
              </div>
            </div>
          </FormProvider>
          <p className="text-secondary text-base font-medium text-center mt-6">
            Didn’t receive the code?{" "}
            <span
              className="text-main font-bold cursor-pointer"
              onClick={resendCode}
            >
              {" "}
              Resend
            </span>
          </p>
        </div>
        <div className="absolute top-5 left-10">
          <div
            className="w-[40px] h-[40px] bg-ternary border border-border rounded-[10px] flex justify-center items-center cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          >
            <img src={ARROW_LEFT_ICON} alt="ARROW_LEFT_ICON" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyOTP;
