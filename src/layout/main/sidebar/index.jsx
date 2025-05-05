import NavIcon from '@/components/common/NavIcon'
import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet'
import { LOGOUT_ACTIVE_ICON, LOGOUT_ICON, USER_ACTIVE_ICON, USER_ICON } from '@/lib/images'
import { cn } from '@/lib/utils'
import SignOutModal from '@/modal/SignOutModal'
import React, { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router'


const Sidebar = ({ isSidebar, setIsSidebar }) => {
    const { pathname } = useLocation();

    const [open, setOpen] = useState({
        open: false,
        data: null
    })

    const sidebar_menu = useMemo(() => [
        {
            name: "Users",
            to: "/users",
            icon: (
                <>
                    <NavIcon active={USER_ACTIVE_ICON} base={USER_ICON} />
                </>
            )
        },
    ], [])
    return (
        <>
            <div className='min-w-[250px] xl:min-w-[270px] 2xl:min-w-[300px]  border-r border-[#FAFAFA] hidden lg:flex flex-col h-dvh bg-white  overflow-hidden '>
                <div className='flex justify-center items-center gap-x-3 py-5  mx-4 border-b border-[#F0F0F0]'>
                    <h1 className='text-3xl font-bold'>LOGO</h1>
                </div>
                <div className="flex flex-col justify-between h-full py-4">
                    <div className="flex h-full flex-1 flex-col px-4 space-y-3">
                        {sidebar_menu?.map((item, index) => (
                            <Link
                                to={item.to}
                                data-active={pathname.includes(item.to)}
                                key={index}
                                className={cn("flex group relative data-[active=true]:bg-main hover:bg-main bg-ternary px-4 py-3 transition-all duration-200 items-center gap-x-2 rounded-[12px]")}>
                                <div>{item.icon}</div>
                                <div className="font-medium text-[17px] group-hover:text-white group-data-[active=true]:text-white text-secondary ">
                                    {item.name}
                                </div>
                            </Link>
                        ))}
                    </div>
                    <button type="button" onClick={() => setOpen({
                        open: true,
                        data: null
                    })} className='flex mx-4 group relative bg-ternary data-[active=true]:bg-main hover:bg-main px-4 py-3.5  transition-all duration-200 cursor-pointer group items-center gap-x-2 rounded-[12px]'>
                        <div>
                            <NavIcon className="" base={LOGOUT_ICON} active={LOGOUT_ACTIVE_ICON} />
                        </div>
                        <div className='font-medium  group-hover:text-white text-[17px] group-data-[active=true]:text-white text-secondary'>Sign Out</div>

                    </button>
                </div>
            </div>
            <Sheet className="" open={isSidebar} onOpenChange={e => setIsSidebar(e)}>
                <SheetContent onOpenAutoFocus={(e) => e.preventDefault()} closeIcon={false} className='w-[300px] bg-white h-dvh p-0 pb-5 flex flex-col focus:ring-0 gap-y-0' side='left'>
                    <SheetHeader asChild className="p-0">
                        <div className='flex justify-center items-center gap-x-3 py-5  mx-4 border-b border-[#F0F0F0]'>
                            <h1 className='text-3xl font-bold'>LOGO</h1>
                        </div>
                    </SheetHeader>
                    <div className="flex flex-col justify-between h-full pt-4">
                        <div className="flex h-full flex-1 flex-col px-4 space-y-3">
                            {sidebar_menu?.map((item, index) => (
                                <Link
                                    to={item.to}
                                    data-active={pathname.includes(item.to)}
                                    key={index}
                                    className={cn("flex group relative data-[active=true]:bg-main hover:bg-main bg-ternary px-4 py-3 transition-all duration-200 items-center gap-x-2 rounded-[12px]")}>
                                    <div>{item.icon}</div>
                                    <div className="font-medium text-[17px] group-hover:text-white group-data-[active=true]:text-white text-secondary">
                                        {item.name}
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <button type="button" onClick={() => setOpen({
                            open: true,
                            data: null
                        })} className='flex mx-4 group relative bg-ternary data-[active=true]:bg-main hover:bg-main px-4 py-3.5  transition-all duration-200 group items-center gap-x-[14.5px] rounded-[12px]'>
                            <div>
                                <NavIcon className="" base={LOGOUT_ICON} active={LOGOUT_ACTIVE_ICON} />
                            </div>
                            <div className='font-medium  group-hover:text-white text-[17px] group-data-[active=true]:text-white text-secondary'>Sign Out</div>

                        </button>
                    </div>
                </SheetContent>
            </Sheet>
            {
                open?.open && <SignOutModal open={open} setOpen={setOpen} />
            }
        </>

    )
}

export default Sidebar