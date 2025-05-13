import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { get } from 'lodash'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'


const TextField = ({ name, placeholder = '', textarea = false, numeric = false, label, className, prefix = null, postfix = null, ...other }) => {
    const { control } = useFormContext();
    return (
        <FormField
            control={control}
            name={name}
            render={({ field, formState: { errors } }) => {
                const fieldError = get(errors, name);
                return (
                    <div className='space-y-1.5 sm:space-y-2.5'>
                        {label && <label className="text-primary font-semibold  text-sm sm:text-base md:text-lg">
                            {label}
                        </label>}
                        <div className='space-y-0.5'>
                            <FormItem className="relative">
                                <FormControl>
                                    {textarea ?
                                        <Textarea
                                            {...field}
                                            {...other}
                                            autoComplete='off'
                                            id={name}
                                            required
                                            placeholder={placeholder}
                                            className={cn('placeholder:text-secondary placeholder:normal-case bg-ternary placeholder:font-normal min-h-[100px] focus-visible:ring-offset-0 focus-visible:ring-1 border-none text-primary text-sm md:text-base placeholder:text-base sm:placeholder:text-lg  h-[52px] sm:h-[58px]   px-6 rounded-[16px] pt-3 font-normal',
                                                fieldError?.message ? "text-red-500 focus-visible:ring-red-500 " : "text-primary  focus-visible:ring-main"
                                                , prefix ? "pl-[50px] sm:pl-[55px]" : "", postfix ? "pr-[50px] sm:pr-[55px]" : "", className)}
                                        /> :
                                        <Input
                                            {...field}
                                            value={field.value}
                                            onChange={(e) => {
                                                if (numeric) {
                                                    field.onChange(e.target.value.replace(/[^0-9]/g, ""))
                                                } else {
                                                    field.onChange(e)
                                                }
                                            }}
                                            {...(numeric && {
                                                inputMode: "numeric"
                                            })}
                                            autoComplete='off'
                                            id={name}
                                            required
                                            placeholder={placeholder}
                                            className={cn('placeholder:text-secondary bg-ternary placeholder:normal-case placeholder:font-normal focus-visible:ring-offset-0 focus-visible:ring-1 border-none text-primary text-sm md:text-base placeholder:text-sm sm:placeholder:text-base  h-[52px] sm:h-[58px]   px-6 rounded-[16px] font-normal',
                                                fieldError?.message ? "text-red-500 focus-visible:ring-red-500 " : "text-primary disabled:text-[#969696f2] focus-visible:ring-main"
                                                , prefix ? "pl-[50px] sm:pl-[55px]" : "", postfix ? "pr-[50px] sm:pr-[55px]" : "", className)}
                                            {...other}
                                        />}
                                </FormControl>
                                {
                                    prefix && <div className={cn('absolute flex items-center', textarea ? 'top-[11.5px] sm:top-[14.4px] left-[16px] sm:left-[20px]' : 'top-[17px] sm:top-[17px] left-[16px] sm:left-[20px]')}>
                                        {prefix}
                                    </div>
                                }
                                {
                                    postfix && <div className={cn('absolute flex items-center', textarea ? 'top-[11.5px] sm:top-[14.4px] right-[16px] sm:right-[20px]' : 'top-[13.5px] sm:top-[18px] right-[16px] sm:right-[20px]')}>
                                        {postfix}
                                    </div>
                                }

                            </FormItem>
                            {fieldError?.message && <div className=' pl-3 text-xs sm:text-sm  font-normal text-red-500'>{fieldError?.message}</div>}
                        </div>

                    </div>
                )
            }}
        >
        </FormField>
    )
}

export default TextField;
