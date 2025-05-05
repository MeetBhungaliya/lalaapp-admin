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
                    <div className='space-y-1.5'>
                        <FormItem>
                            <FormControl>
                                <InputOTP className="" maxLength={4} {...field}>
                                    <InputOTPGroup className="gap-x-3 w-full flex  md:gap-x-5">
                                        <InputOTPSlot className={cn(" h-14 xl:h-[60px] shadow-none flex-1 border-none data-[active=true]:ring-1 text-lg sm:text-xl font-medium  bg-ternary !rounded-[12px]",
                                            fieldError?.message ? "text-red-500 data-[active=true]:ring-red-500" : "text-primary data-[active=true]:ring-main"
                                        )} index={0} />
                                        <InputOTPSlot className={cn(" h-14 xl:h-[60px] flex-1 border-none shadow-none data-[active=true]:ring-1 text-lg sm:text-xl font-medium bg-ternary  !rounded-[12px]",
                                            fieldError?.message ? "text-red-500 data-[active=true]:ring-red-500" : "text-primary data-[active=true]:ring-main"
                                        )} index={1} />
                                        <InputOTPSlot className={cn("h-14 xl:h-[60px] flex-1 border-none shadow-none data-[active=true]:ring-1 text-lg sm:text-xl font-medium  bg-ternary  !rounded-[12px]",
                                            fieldError?.message ? "text-red-500 data-[active=true]:ring-red-500" : "text-primary data-[active=true]:ring-main"
                                        )} index={2} />
                                        <InputOTPSlot className={cn("h-14 xl:h-[60px] flex-1 border-none shadow-none data-[active=true]:ring-1 text-lg sm:text-xl font-medium  bg-ternary  !rounded-[12px]",
                                            fieldError?.message ? "text-red-500 data-[active=true]:ring-red-500" : "text-primary data-[active=true]:ring-main"
                                        )} index={3} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                        </FormItem>
                        {fieldError?.message && <div className='pt-2 pl-1 text-[13px] sm:text-[15px]  font-normal text-red-500'>{fieldError?.message}</div>}
                    </div>
                )

            }}
        />
    );
};

export default OtpField;
