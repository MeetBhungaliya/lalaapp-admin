import { cn } from '@/lib/utils'
import React from 'react'

const NavIcon = ({ active, base, className, ...other }) => {
    return (
        <>
            <img className={cn('group-hover:hidden group-data-[active=true]:hidden block', className)} src={base} {...other} alt="" />
            <img className={cn('group-hover:block group-data-[active=true]:block hidden', className)} src={active} {...other} alt="" />
        </>
    )
}

export default NavIcon