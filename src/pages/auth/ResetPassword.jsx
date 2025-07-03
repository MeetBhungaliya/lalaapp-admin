import Loading from "@/components/common/Loading";
import Button from "@/components/custom/Button";
import { METHODS } from "@/constants/common";
import { UPDATE_PASSWORD } from "@/constants/endpoints";
import FormProvider from "@/form/FormProvider";
import PasswordField from "@/form/PasswordField";
import { fetchApi } from "@/lib/api";
import {
  ARROW_LEFT_ICON,
  LOCK2_ICON,
  LOCK_ICON,
  RESET_PASSWORD_IMAGE,
} from "@/lib/images";
import { ResetPasswordSchema } from "@/lib/schema";
import { asyncResponseToaster } from "@/lib/toasts";
import SucessModal from "@/modal/SucessModal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate } from "react-router";

const defaultValues = {
  new_password: "",
  confirm_password: "",
};

const ResetPassword = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(ResetPasswordSchema),
  });

  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;

  const resetPasswordMutation = useMutation({
    mutationFn: async (data) =>
      fetchApi({ url: UPDATE_PASSWORD, method: METHODS.PUT, data }),
  });

  const onSubmit = async (values) => {
    const result = await asyncResponseToaster(() =>
      resetPasswordMutation.mutateAsync({
        email: state?.email,
        new_pass: values.confirm_password,
      })
    );

    if (result.success && result.value && result.value.isSuccess) {
      setOpen(true);
    }
  };

  if (!state || !("email" in state) || !("isOTPConfirmed" in state)) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <section className="min-h-dvh flex flex-col md:flex-row p-6">
        <div className="flex-1 flex flex-col justify-center relative items-center max-md:hidden bg-[#EAF6FE] rounded-[34px]">
          <div>
            <img
              src={RESET_PASSWORD_IMAGE}
              alt="RESET_PASSWORD_IMAGE"
              className="max-w-[610px]"
            />
          </div>
        </div>
        <div className="flex-1 px-5 sm:px-5 md:px-8 lg:px-10 py-14  bg-white flex items-center relative">
          <div className="max-w-[420px] space-y-4 sm:space-y-5 w-full mx-auto">
            <div className="size-[80px] bg-light rounded-full flex justify-center items-center">
              <img src={LOCK2_ICON} alt="LOCK2_ICON" />
            </div>
            <div className="space-y-0.5  pt-7">
              <h2 className="text-primary font-bold text-[26px] sm:text-[30px] md:text-[34px]">
                Create New Password
              </h2>
              <p className="text-[20px] font-normal text-[#7E808C]">
                Create a new password for your account. Make sure it’s strong
                and easy to remember
              </p>
            </div>
            <FormProvider
              methods={methods}
              onSubmit={handleSubmit(onSubmit)}
              className="w-full pt-6"
            >
              <div className="space-y-6">
                <PasswordField
                  name="new_password"
                  placeholder="Enter new password"
                  prefix={<img src={LOCK_ICON} alt="LOCK_ICON" />}
                />
                <PasswordField
                  name="confirm_password"
                  placeholder="Confirm new password"
                  prefix={<img src={LOCK_ICON} alt="LOCK_ICON" />}
                />
              </div>
              <div className="pt-12">
                <Button
                  disabled={!isDirty || resetPasswordMutation.isPending}
                  className="text-base max-sm:py-[12.5px] shadow-[0px_4px_6px_0px_#8FD5FF] font-semibold sm:text-lg"
                  type="submit"
                  loader={resetPasswordMutation.isPending}
                >
                  Reset Password
                </Button>
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
      <SucessModal open={open} setOpen={setOpen} />
    </>
  );
};

export default ResetPassword;
