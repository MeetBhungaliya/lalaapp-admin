import React, { useState } from 'react'
import Sidebar from './sidebar'
import Header from './header'
import { Outlet } from 'react-router'

const Layout = () => {
    const [isSidebar, setIsSidebar] = useState(false)
    return (
        <section className='flex bg-[#FAFAFA]'>
            <Sidebar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
            <div className='w-full h-dvh flex flex-col overflow-hidden'>
                <Header setIsSidebar={setIsSidebar} />
                <Outlet />
            </div>
        </section>
    )
}

export default Layout