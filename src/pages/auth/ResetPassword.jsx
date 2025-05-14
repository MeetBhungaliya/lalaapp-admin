import Loading from "@/components/common/Loading";
import Button from "@/components/custom/Button";
import FormProvider from "@/form/FormProvider";
import PasswordField from "@/form/PasswordField";
import {
  ARROW_LEFT_ICON,
  LOCK2_ICON,
  LOCK_ICON,
  RESET_PASSWORD_ICON,
  RESET_PASSWORD_IMAGE,
} from "@/lib/images";
import { ResetPasswordSchema } from "@/lib/schema";
import SucessModal from "@/modal/SucessModal";
import { resetPassword } from "@/redux/actions/auth.action";
import { yupResolver } from "@hookform/resolvers/yup";
import md5 from "md5";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

const ResetPassword = () => {
  const actionDispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const defaultValues = {
    new_password: "",
    confirm_password: "",
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(ResetPasswordSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = (values) => {
    console.log(values);
    setOpen(true);
  };

  return (<>
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
          {/* <div className="flex justify-center"> */}
          <div className="size-[80px] bg-light rounded-full flex justify-center items-center">
            <img src={LOCK2_ICON} alt="LOCK2_ICON" />
          </div>
          {/* </div>   */}
          <div className="space-y-0.5  pt-7">
            <h2 className="text-primary font-bold text-[26px] sm:text-[30px] md:text-[34px]">
              Create New Password
            </h2>
            <p className="text-[20px] font-normal text-[#7E808C]">
            Create a new password for your account. Make sure it’s strong and easy to remember
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
                disabled={loading}
                className="text-base max-sm:py-[12.5px] shadow-[0px_4px_6px_0px_#8FD5FF] font-semibold sm:text-lg"
                type="submit"
                loader={loading}
              >
                {loading ? <Loading className="text-2xl" /> : "Reset Password"}
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
