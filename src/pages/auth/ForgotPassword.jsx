import Loading from "@/components/common/Loading";
import Button from "@/components/custom/Button";
import FormProvider from "@/form/FormProvider";
import TextField from "@/form/TextField";
import {
  ARROW_LEFT_ICON,
  FORGET_ICON,
  FORGOT_PASSWORD_IMAGE,
  SMS_ICON,
} from "@/lib/images";
import { ForgotPasswordSchema } from "@/lib/schema";
import { forgotPassword } from "@/redux/actions/auth.action";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const defaultValues = {
    email: "",
  };
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(ForgotPasswordSchema),
  });
  const { handleSubmit } = methods;

  const onSubmit = (values) => {
    dispatch(forgotPassword(values))
      .unwrap()
      .then(() => {
        navigate("/verify_otp", {
          state: {
            email: values.email,
          },
        });
      });
  };

  return (
    <section className="min-h-dvh flex flex-col md:flex-row p-6">
      <div className="flex-1 flex flex-col justify-center relative items-center max-md:hidden bg-[#F2F6F6] rounded-[48px]">
        <div>
          <img
            src={FORGOT_PASSWORD_IMAGE}
            alt="FORGOT_PASSWORD_IMAGE"
            className="max-w-[610px]"
          />
        </div>
      </div>
      <div className="flex-1 px-5 sm:px-5 md:px-8 lg:px-10 py-14  bg-white flex items-center relative">
        <div className="max-w-[520px] space-y-4 sm:space-y-5 w-full mx-auto">
          <div className="flex justify-center">
            <div className="size-[120px] bg-ternary rounded-full flex justify-center items-center">
              <img src={FORGET_ICON} alt="FORGET_ICON" />
            </div>
          </div>
          <div className="sm:space-y-1.5">
            <h2 className="text-primary font-bold text-center text-[24px] sm:text-[26px] md:text-[30px]">
              Forgot Password
            </h2>
            <p className="sm:text-base text-sm font-medium text-center text-secondary">
              No worries, we'll help you reset your password
            </p>
          </div>
          <div className="pt-1">
            <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
              <div className="flex flex-col gap-6 sm:gap-8">
                <div className="space-y-5">
                  <div>
                    <TextField
                      placeholder="Enter Email"
                      prefix={<img src={SMS_ICON} />}
                      name="email"
                    />
                  </div>
                </div>
                <div className="max-sm:pt-1">
                  <Button
                    disabled={loading}
                    className="text-base max-sm:py-[13.5px] font-semibold sm:text-lg"
                    type="submit"
                    loader={loading}
                  >
                    {loading ? <Loading className="text-2xl" /> : "Send"}
                  </Button>
                </div>
              </div>
            </FormProvider>
          </div>
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

export default ForgotPassword;
