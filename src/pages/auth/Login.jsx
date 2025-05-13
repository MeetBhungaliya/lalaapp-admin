import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "@/lib/schema";
import {
  LALA_LOGO,
  LOCK_ICON,
  LOGIN_ICON,
  LOGIN_IMAGE,
  SMS_ICON,
} from "@/lib/images";
import FormProvider from "@/form/FormProvider";
import TextField from "@/form/TextField";
import PasswordField from "@/form/PasswordField";
import Button from "@/components/custom/Button";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/actions/auth.action";
import md5 from "md5";

const Login = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const defaultValues = {
    email: "",
    password: "",
  };
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(LoginSchema),
  });
  const { handleSubmit } = methods;

  const onSubmit = (values) => {
    navigate("/statistics");
  };

  return (
    <section className="min-h-dvh flex flex-col md:flex-row p-6">
      <div className="flex-1 flex flex-col justify-center relative items-center max-md:hidden bg-[#EAF6FE] rounded-[34px]">
        <div>
          <img src={LOGIN_IMAGE} alt="LOGIN_IMAGE" className="max-w-[610px]" />
        </div>
      </div>
      <div className="flex-1 px-5 sm:px-5 md:px-8 lg:px-10 py-14  bg-white flex items-center">
        <div className="max-w-[420px] space-y-4 sm:space-y-5 w-full mx-auto">
          <div className="size-[120px] rounded-full">
            <img src={LALA_LOGO} alt="LALA_LOGO" />
          </div>
          <div className="sm:space-y-1.5">
            <h2 className="text-primary font-bold text-[26px] sm:text-[30px] md:text-[34px]">
              Welcome Back!
            </h2>
            <p className="text-[20px] font-normal text-[#7E808C]">
              Please enter your details.
            </p>
          </div>
          <div className="pt-1">
            <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
              <div className="flex flex-col gap-6 sm:gap-8">
                <div className="space-y-5">
                  <div>
                    <TextField
                      placeholder="Enter email"
                      prefix={<img src={SMS_ICON} />}
                      name="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <PasswordField
                      prefix={<img src={LOCK_ICON} />}
                      placeholder="Enter password"
                      name="password"
                    />
                    <div className="flex justify-end">
                      <Link
                        to={"/forgot_password"}
                        className="block w-max pt-1 text-lg  font-medium text-[#1E1614] text-end"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="max-sm:pt-1">
                  <Button
                    disabled={loading}
                    className="text-base max-sm:py-[12.5px] font-semibold sm:text-lg shadow-[0px_4px_6px_0px_#8FD5FF]"
                    type="submit"
                    loader={loading}
                  >
                    Login
                  </Button>
                </div>
              </div>
            </FormProvider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
