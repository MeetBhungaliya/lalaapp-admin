import Image from '@/components/common/Images';
import { breakpoints } from '@/lib/utils';
import { createColumnHelper } from '@tanstack/react-table';
import { Minus } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react'

const useColumnDef = (fns) => {
    const columnHelper = createColumnHelper();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getColumnSize = (sizes) => {
        if (typeof sizes === "number") {
            return sizes
        }
        else if (sizes && typeof sizes === "object") {
            const breakpointKeys = Object.keys(breakpoints).reverse();
            for (const key of breakpointKeys) {
                if (screenWidth >= breakpoints[key] && sizes[key] !== undefined) {
                    return sizes[key];
                }
            }
            return sizes.default !== undefined ? sizes.default : null;
        } else {
            return null
        }
    };
    const cellBuilder = useCallback((props, el) => {
        return props.getValue() ?? <Minus className='size-4' />
    }, [])

    const rowBuilder = useCallback((accessor, header, cell, size = null, align = 'start') => {
        return columnHelper.accessor(accessor, {
            header, cell, size: getColumnSize(size), meta: {
                align: align
            }
        })
    }, [])

    const user = useMemo(() => [
        rowBuilder('name', () => <p className='pl-4'>Name</p>,
            ({ getValue, row }) => (
                <div className="flex items-center gap-3 pl-3.5">
                    <Image src={row?.original?.profile} alt="" className="size-[50px] object-cover rounded-[10px]" />
                    <p className=" text-primary text-wrap break-all">{getValue()}</p>
                </div>
            ), {
            '4xl': null,
            '3xl': 300,
            default: 300
        }),
        rowBuilder('email', 'Email', ({ getValue }) => (
            <p className='break-all text-wrap'>{getValue()}</p>
        ), {
            '4xl': null,
            '3xl': 300,
            default: 250
        }),
        rowBuilder('phone', 'Mobile Number', ({ getValue }) => (
            <p className='break-all'>12345 67890</p>
        ), {
            '3xl': 300,
            default: 250
        }),

    ], [screenWidth])
    return {
        user
    }
}

export default useColumnDef