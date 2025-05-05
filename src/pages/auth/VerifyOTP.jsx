import Loading from "@/components/common/Loading";
import Button from "@/components/custom/Button";
import FormProvider from "@/form/FormProvider";
import OtpField from "@/form/OTPField";
import {
  ARROW_LEFT_ICON,
  CALCULATOR_ICON,
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
    navigate("/reset_password");
  };

  const resendCode = () => {
    // actionDispatch(
    //   forgotPassword({
    //     email: state?.email,
    //   })
    // )
    //   .unwrap()
    //   .then(() => {
    //     reset({
    //       otp: "",
    //     });
    //   });
  };

  return (
    <section className="min-h-dvh flex flex-col md:flex-row p-6">
      <div className="flex-1 flex flex-col justify-center relative items-center max-md:hidden bg-[#EAF6FE] rounded-[34px]">
        <div>
          <img
            src={VERIFY_OTP_IMAGE}
            alt="VERIFY_OTP_IMAGE"
            className="max-w-[610px]"
          />
        </div>
      </div>
      <div className="flex-1 px-5 sm:px-5 md:px-8 lg:px-10 py-14  bg-white flex items-center relative">
        <div className="max-w-[420px] space-y-4 sm:space-y-5 w-full mx-auto">
          <div className="size-[80px] bg-light rounded-full flex justify-center items-center">
            <img src={CALCULATOR_ICON} alt="CALCULATOR_ICON" />
          </div>
          <div className=" space-y-0.5">
            <h2 className="text-primary font-bold text-[24px] sm:text-[26px] md:text-[30px]">
              Authentication
            </h2>
            <p className="text-[20px] font-normal text-[#7E808C]">
              {" "}
              Enter the verification code we just sent to your email address.
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
              <p className="text-priamry text-lg font-normal text-center">
                Didn’t receive the code?{" "}
                <span
                  className="text-main text-lg font-normal cursor-pointer"
                  onClick={resendCode}
                >
                  {" "}
                  Resend
                </span>
              </p>
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
        </div>
        <div className="absolute top-10 left-16">
          <div
            className="w-[40px] h-[40px] bg-white rounded-[8px] flex justify-center items-center cursor-pointer shadow-[0px_-2px_0px_0px_#DCF1FF_inset,0px_1px_10px_0px_#0000001A]"
            onClick={() => {
              navigate(-1);
            }}
          >
            <img
              src={ARROW_LEFT_ICON}
              alt="ARROW_LEFT_ICON"
              className="size-6"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyOTP;
