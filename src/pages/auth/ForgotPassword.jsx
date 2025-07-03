import Button from "@/components/custom/Button";
import { METHODS } from "@/constants/common";
import { FORGOT_PASSWORD } from "@/constants/endpoints";
import FormProvider from "@/form/FormProvider";
import TextField from "@/form/TextField";
import { fetchApi } from "@/lib/api";
import {
  ARROW_LEFT_ICON,
  EMAIL_ICON,
  FORGOT_PASSWORD_IMAGE,
  SMS_ICON,
} from "@/lib/images";
import { ForgotPasswordSchema } from "@/lib/schema";
import { asyncResponseToaster } from "@/lib/toasts";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const defaultValues = {
  email: "",
};

const ForgotPassword = () => {
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(ForgotPasswordSchema),
  });

  const {
    handleSubmit,
    formState: { isDirty },
    reset,
  } = methods;

  const forgotPasswordMutation = useMutation({
    mutationFn: async (data) =>
      fetchApi({ url: FORGOT_PASSWORD, method: METHODS.POST, data }),
  });

  const onSubmit = async (values) => {
    const result = await asyncResponseToaster(() =>
      forgotPasswordMutation.mutateAsync({ email: values.email.toLowerCase() })
    );

    if (result.success && result.value && result.value.isSuccess) {
      navigate("/verify_otp", { state: { email: values.email.toLowerCase() } });
      reset();
    }
  };

  return (
    <section className="min-h-dvh flex flex-col md:flex-row p-6">
      <div className="flex-1 flex flex-col justify-center relative items-center max-md:hidden bg-[#EAF6FE] rounded-[34px]">
        <div>
          <img
            src={FORGOT_PASSWORD_IMAGE}
            alt="FORGOT_PASSWORD_IMAGE"
            className="max-w-[610px]"
          />
        </div>
      </div>
      <div className="flex-1 px-5 sm:px-5 md:px-8 lg:px-10 py-14  bg-white flex items-center relative">
        <div className="max-w-[420px] space-y-4 sm:space-y-5 w-full mx-auto">
          <div className="size-[80px] bg-light rounded-full flex justify-center items-center">
            <img src={EMAIL_ICON} alt="EMAIL_ICON" />
          </div>
          <div className="sm:space-y-1.5 pt-6">
            <h2 className="text-primary font-bold text-[26px] sm:text-[30px] md:text-[34px]">
              Forgot Password?
            </h2>
            <p className="text-[20px] font-normal text-[#7E808C]">
              No worries, we will help you to reset your password.
            </p>
          </div>
          <div className="pt-6">
            <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
              <div className="flex flex-col gap-10 sm:gap-12">
                <div className="space-y-5">
                  <div>
                    <TextField
                      placeholder="Enter email"
                      prefix={<img src={SMS_ICON} />}
                      name="email"
                    />
                  </div>
                </div>
                <div className="max-sm:pt-1">
                  <Button
                    disabled={!isDirty || forgotPasswordMutation.isPending}
                    className="text-base max-sm:py-[12.5px] shadow-[0px_4px_6px_0px_#8FD5FF] font-semibold sm:text-lg"
                    type="submit"
                    loader={forgotPasswordMutation.isPending}
                  >
                    Send Code
                  </Button>
                </div>
              </div>
            </FormProvider>
          </div>
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

export default ForgotPassword;
