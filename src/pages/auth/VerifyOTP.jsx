import Button from "@/components/custom/Button";
import { METHODS } from "@/constants/common";
import { FORGOT_PASSWORD, VERIFY_OTP } from "@/constants/endpoints";
import FormProvider from "@/form/FormProvider";
import OtpField from "@/form/OTPField";
import { fetchApi } from "@/lib/api";
import {
  ARROW_LEFT_ICON,
  CALCULATOR_ICON,
  VERIFY_OTP_IMAGE,
} from "@/lib/images";
import { OTPSchema } from "@/lib/schema";
import { asyncResponseToaster } from "@/lib/toasts";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate } from "react-router";

const defaultValues = {
  otp: "",
};

const VerifyOTP = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(OTPSchema),
  });

  const {
    handleSubmit,
    formState: { isDirty },
    reset,
  } = methods;

  const verifyOTPMutation = useMutation({
    mutationFn: async (data) =>
      fetchApi({ url: VERIFY_OTP, method: METHODS.POST, data }),
  });

  const resendOTPMutation = useMutation({
    mutationFn: async (data) =>
      fetchApi({ url: FORGOT_PASSWORD, method: METHODS.POST, data }),
  });

  const onSubmit = async (values) => {
    const result = await asyncResponseToaster(() =>
      verifyOTPMutation.mutateAsync({
        email: state?.email,
        otp: values.otp,
      })
    );

    if (result.success && result.value && result.value.isSuccess) {
      navigate("/reset_password", {
        state: { email: state?.email, isOTPConfirmed: true },
      });
      reset();
    }
  };

  const resendCode = async () => {
    await asyncResponseToaster(() =>
      resendOTPMutation.mutateAsync({ email: state?.email })
    );
  };

  if (!state || !("email" in state)) {
    return <Navigate to="/login" replace />;
  }

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
          <div className=" space-y-0.5 pt-7">
            <h2 className="text-primary font-bold text-[24px] sm:text-[26px] md:text-[30px]">
              Authentication
            </h2>
            <p className="text-[20px] font-normal text-[#7E808C]">
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
              <p className="text-priamry text-lg font-normal text-center pt-2">
                Didn’t receive the code?{" "}
                <span
                  className="text-main text-lg font-normal cursor-pointer"
                  onClick={resendCode}
                >
                  Resend
                </span>
              </p>
              <div className="pt-3">
                <Button
                  disabled={
                    !isDirty ||
                    verifyOTPMutation.isPending ||
                    resendOTPMutation.isPending
                  }
                  className="text-base max-sm:py-[12.5px] shadow-[0px_4px_6px_0px_#8FD5FF] font-semibold sm:text-lg"
                  type="submit"
                  loader={
                    verifyOTPMutation.isPending || resendOTPMutation.isPending
                  }
                >
                  Verify
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
