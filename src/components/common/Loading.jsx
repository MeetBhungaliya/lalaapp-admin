import React from 'react'
import Iconify from './Iconify'
import { cn } from '@/lib/utils'

const Loading = ({ className }) => {
    return (
        <Iconify className={cn("small-loader-container text-2xl", className)} icon="tabler:loader" />
    )
}

export default Loading