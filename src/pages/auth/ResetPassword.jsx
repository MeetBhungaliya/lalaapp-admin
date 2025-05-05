import Loading from '@/components/common/Loading';
import Button from '@/components/custom/Button';
import FormProvider from '@/form/FormProvider';
import PasswordField from '@/form/PasswordField';
import { ARROW_LEFT_ICON, LOCK_ICON, RESET_PASSWORD_ICON, RESET_PASSWORD_IMAGE } from '@/lib/images'
import { ResetPasswordSchema } from '@/lib/schema';
import { resetPassword } from '@/redux/actions/auth.action';
import { yupResolver } from '@hookform/resolvers/yup';
import md5 from 'md5';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

const ResetPassword = () => {
    const actionDispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth)
    const { state } = useLocation();
    const navigate = useNavigate()

    const defaultValues = {
        new_password: "",
        confirm_password: ""
    }

    const methods = useForm({
        defaultValues,
        resolver: yupResolver(ResetPasswordSchema)
    })

    const { handleSubmit } = methods

    const onSubmit = (values) => {
        actionDispatch(resetPassword({
            email: state?.email,
            new_password: md5(values.new_password)
        })).unwrap().then(() => {
            navigate('/login')
        })
    }

    return (
        <section className="min-h-dvh flex flex-col md:flex-row p-6">
            <div className="flex-1 flex flex-col justify-center relative items-center max-md:hidden bg-[#F2F6F6] rounded-[48px]">
                <div>
                    <img src={RESET_PASSWORD_IMAGE} alt="RESET_PASSWORD_IMAGE" className="max-w-[610px]" />
                </div>
            </div>
            <div className="flex-1 px-5 sm:px-5 md:px-8 lg:px-10 py-14  bg-white flex items-center relative">
                <div className="max-w-[520px] space-y-4 sm:space-y-5 w-full mx-auto">
                    <div className="flex justify-center">
                        <div className="size-[120px] bg-ternary rounded-full flex justify-center items-center">
                            <img src={RESET_PASSWORD_ICON} alt="RESET_PASSWORD_ICON" />
                        </div>
                    </div>
                    <div className='text-center space-y-0.5  mt-7'>
                        <p className='text-primary text-[26px] font-semibold'>Reset Password</p>
                        <p className='text-secondary text-base sm:text-lg font-normal mx-auto text-wrap'>Create a new password for your
                            account. Make sure it’s strong and
                            easy to remember</p>
                    </div>
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <div className='space-y-5'>
                            <PasswordField name="new_password" placeholder='Enter new password' prefix={<img src={LOCK_ICON} alt='LOCK_ICON' />} />
                            <PasswordField name="confirm_password" placeholder='Confirm new password' prefix={<img src={LOCK_ICON} alt='LOCK_ICON' />} />
                        </div>
                        <div className="pt-8">
                            <Button
                                disabled={loading}
                                className="text-base max-sm:py-[13.5px] font-semibold sm:text-lg"
                                type='submit'
                                loader={loading}
                            >
                                {loading ? <Loading className="text-2xl" /> : 'Update'}
                            </Button>
                        </div>
                    </FormProvider>
                </div>
                <div className='absolute top-5 left-10'>
                    <div className='w-[40px] h-[40px] bg-ternary border border-border rounded-[10px] flex justify-center items-center cursor-pointer' onClick={() => { navigate(-1) }}>
                        <img src={ARROW_LEFT_ICON} alt="ARROW_LEFT_ICON" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ResetPassword