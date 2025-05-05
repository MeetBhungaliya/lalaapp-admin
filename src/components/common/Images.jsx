
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { FALL_BACK_IMAGE } from '@/lib/images'
import { Skeleton } from '../ui/skeleton'

const Image = ({ src = '', fallback = null, className = '' }) => {
    const [loading, setLoading] = useState(true)
    const handleImageLoaded = () => {
        setLoading(false)
    }
    return (
        <>
            <img onError={(e) => {
                setLoading(false)
                e.target.src = fallback ?? FALL_BACK_IMAGE;
            }} onLoad={handleImageLoaded} src={src ?? FALL_BACK_IMAGE} className={cn(loading && 'hidden', className)} alt="" />
            <Skeleton className={cn('bg-neutral-300', !loading && 'hidden', className)} />
        </>
    )
}

export default Image;