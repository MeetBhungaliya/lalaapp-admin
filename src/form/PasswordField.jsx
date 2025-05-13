
import { useFormContext } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { get } from 'lodash'
import { useState } from 'react'
import { EYE_ICON, EYE_SLASH_ICON } from '@/lib/images'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const PasswordField = ({ name, placeholder = '', label, className, prefix = null, ...other }) => {
    const { control } = useFormContext();
    const [showPassword, setShowPassword] = useState(false)
    return (
        <FormField
            control={control}
            name={name}
            render={({ field, formState: { errors } }) => {
                const fieldError = get(errors, name);
                return (
                    <div className='space-y-1.5 sm:space-y-2.5'>
                        {label && <label className="text-primary font-semibold text-sm sm:text-base md:text-lg">
                            {label}
                        </label>}
                        <div className='space-y-0.5'>
                            <FormItem className="relative">
                                <FormControl>
                                    <Input
                                        {...field}
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete='off'
                                        id={name}
                                        required
                                        placeholder={placeholder}
                                        className={cn('placeholder:text-secondary bg-ternary placeholder:font-normal focus-visible:ring-offset-0 focus-visible:ring-1 border-none text-primary text-sm md:text-base placeholder:text-sm sm:placeholder:text-base  h-[52px] sm:h-[58px]   px-6 rounded-[16px] font-normal',
                                            fieldError?.message ? "text-red-500 focus-visible:ring-red-500 " : "text-primary disabled:text-[#969696f2] focus-visible:ring-main"
                                            , prefix ? "pl-[50px] sm:pl-[55px]" : "", "pr-[50px] sm:pr-[55px]", className)}
                                        {...other}
                                    />
                                </FormControl>
                                {
                                    prefix && <div className={cn('absolute flex items-center', 'top-[14px] sm:top-[18px] left-[16px] sm:left-[20px]')}>
                                        {prefix}
                                    </div>
                                }
                                {
                                    <div className={cn('absolute flex items-center', 'top-[13.5px] sm:top-[18px] right-[16px] sm:right-[20px]')}>
                                        <img onClick={() => setShowPassword((prev) => !prev)} className='cursor-pointer' src={showPassword ? EYE_ICON : EYE_SLASH_ICON} alt="" />
                                    </div>
                                }

                            </FormItem>
                            {fieldError?.message && <div className=' pl-3 text-xs sm:text-sm font-normal text-red-500'>{fieldError?.message}</div>}
                        </div>

                    </div>
                )
            }}
        >
        </FormField>
    )
}

export default PasswordField;