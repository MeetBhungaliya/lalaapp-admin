import { cn } from "@/lib/utils"
import Loading from "../common/Loading"

const Button = ({ type = "button", className = "",   children, loader, ...props }) => {
    return (
        <button type={type} className={cn("bg-main cursor-pointer flex justify-center items-center text-center px-5 disabled:bg-main/70 text-white  w-full rounded-[16px] py-3.5", className)} {...props}>
            {loader ? <Loading /> : <>{children}</>}
        </button>
    )
}

export default Button
