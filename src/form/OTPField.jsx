import React from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { get } from "lodash";

const OtpField = ({ name }) => {
    const { control } = useFormContext();

    return (
        <FormField
            name={name}
            control={control}
            render={({ field, formState: { errors } }) => {
                const fieldError = get(errors, name);
                return (
                    <div className='space-y-1'>
                        <FormItem>
                            <FormControl>
                                <InputOTP className="" maxLength={4} onKeyDown={(e) => {
                                    // Allow only numbers, backspace, delete, arrow keys
                                    if (
                                        !/^\d$/.test(e.key) && // Not a number
                                        !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)
                                    ) {
                                        e.preventDefault();
                                    }
                                }} {...field}>
                                    <InputOTPGroup className="gap-x-3 w-full flex justify-center md:gap-x-5">
                                        <InputOTPSlot className={cn(" h-14 xl:h-[60px] shadow-none w-[80px] border-none data-[active=true]:ring-1 text-lg sm:text-xl font-medium  bg-ternary !rounded-[16px]",
                                            fieldError?.message ? "text-red-500 data-[active=true]:ring-red-500" : "text-primary data-[active=true]:ring-main"
                                        )} index={0} inputMode="numeric" />
                                        <InputOTPSlot className={cn(" h-14 xl:h-[60px] w-[80px] border-none shadow-none data-[active=true]:ring-1 text-lg sm:text-xl font-medium bg-ternary  !rounded-[16px]",
                                            fieldError?.message ? "text-red-500 data-[active=true]:ring-red-500" : "text-primary data-[active=true]:ring-main"
                                        )} index={1} inputMode="numeric" />
                                        <InputOTPSlot className={cn("h-14 xl:h-[60px] w-[80px] border-none shadow-none data-[active=true]:ring-1 text-lg sm:text-xl font-medium  bg-ternary  !rounded-[16px]",
                                            fieldError?.message ? "text-red-500 data-[active=true]:ring-red-500" : "text-primary data-[active=true]:ring-main"
                                        )} index={2} inputMode="numeric" />
                                        <InputOTPSlot className={cn("h-14 xl:h-[60px] w-[80px] border-none shadow-none data-[active=true]:ring-1 text-lg sm:text-xl font-medium  bg-ternary  !rounded-[16px]",
                                            fieldError?.message ? "text-red-500 data-[active=true]:ring-red-500" : "text-primary data-[active=true]:ring-main"
                                        )} index={3} inputMode="numeric" />
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                        </FormItem>
                        {fieldError?.message && <div className='pt-1 pl-5 text-[13px] sm:text-[15px]  font-normal text-red-500'>{fieldError?.message}</div>}
                    </div>
                )

            }}
        />
    );
};

export default OtpField;
