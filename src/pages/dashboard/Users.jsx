import Datatable from '@/components/common/Datatable'
import useColumnDef from '@/hooks/useColumnDef'
import { usersData } from '@/data/data'
import React from 'react'

const Users = () => {

    const { user } = useColumnDef();

    return (
        <div className='flex-1 overflow-y-auto px-3 sm:px-7 py-5'>
            <Datatable data={usersData} columns={user} />
        </div>
    )
}

export default Users