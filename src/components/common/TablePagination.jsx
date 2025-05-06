import React, { useMemo } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';
import { cn } from '@/lib/utils';
import usePagination from '@/hooks/usePagination';
import { PAGINATION_DISPATCH_TYPES } from '@/utils/constants';

const generatePaginationRange = (totalPages, currentPage) => {

    const siblingCount = 1;
    const totalNumbers = siblingCount * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages <= totalBlocks) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 1;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!showLeftDots && showRightDots) {
        return [...Array.from({ length: 3 + 2 * siblingCount }, (_, index) => index + 1), '...', totalPages];
    }

    if (showLeftDots && !showRightDots) {
        const start = totalPages - (3 + 2 * siblingCount) + 1;
        return [firstPageIndex, '...', ...Array.from({ length: 3 + 2 * siblingCount }, (_, index) => start + index)];
    }

    if (showLeftDots && showRightDots) {
        return [firstPageIndex, '...', ...Array.from({ length: 2 * siblingCount + 1 }, (_, index) => leftSiblingIndex + index), '...', lastPageIndex];
    }
};

const   TablePagination = ({ count }) => {
    const paginationLimits = useMemo(() => [5, 10, 15, 30, 50], [])
    const {
        state: {
            total,
            limit,
            page
        },
        dispatch
    } = usePagination();
    const totalPages = useMemo(() => Math.ceil(total / limit), [total, limit])
    const paginationRange = useMemo(() => generatePaginationRange(totalPages, page), [totalPages, page]);
    return (
        <div className={cn('px-[34px] py-5 bg-white border-t-[2px] border-[#F1F5F9]   flex justify-between items-center gap-2 flex-col sm:flex-row')}>
            <div className="flex items-center gap-2">
                <div className=''>
                    <Select
                        value={limit}
                        onValueChange={(value) => {
                            dispatch({
                                type: PAGINATION_DISPATCH_TYPES.SET_LIMIT,
                                payload: value
                            })
                        }}

                    >
                        <SelectTrigger className="w-[65px]  max-sm:h-9 h-auto py-[8px] focus:ring-offset-0 focus:ring-1 focus:ring-main font-medium text-sm">
                            <SelectValue placeholder={limit} />
                        </SelectTrigger>
                        <SelectContent className="min-w-[6rem]">
                            {
                                paginationLimits.map((item, key) => (
                                    <SelectItem className="font-semibold " key={key} value={item}>{item}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>
                <p className='w-full text-center sm:text-start text-primary text-[14px]'>Showing {((page - 1) * limit) + (count ? 1 : 0)}-{((page - 1) * limit) + count} out of {total} Results</p>
            </div>
            <div className='flex gap-3 items-center'>
                <div>
                    <Pagination className='justify-center pt-0 sm:justify-end'>
                        <PaginationContent className="space-x-1">
                            <PaginationItem>
                                <PaginationPrevious
                                    className={cn('size-8 sm:size-10 cursor-pointer p-0 bg-transparent text-[#5C6268]  aspect-square rounded-full', page === 1 && 'cursor-default')}
                                    onClick={() => {
                                        if (!(page === 1)) {
                                            dispatch({ type: PAGINATION_DISPATCH_TYPES.PREV_PAGE })
                                        }
                                    }}
                                    disabled={page === 1}
                                />
                            </PaginationItem>
                            {
                                paginationRange.map((pageNumber, index) => (
                                    <PaginationItem key={index}>
                                        <PaginationLink
                                            isActive={page == pageNumber}
                                            disabled={pageNumber === '...'}
                                            onClick={() => {
                                                if (pageNumber !== '...') {
                                                    dispatch({ type: PAGINATION_DISPATCH_TYPES.SET_PAGE, payload: pageNumber })
                                                }

                                            }}
                                            className={cn('size-8 sm:size-9  cursor-pointer  border-[2px] border-none  text-sm md:text-base  text-[#7F8892] bg-transparent aria-[current=page]:text-white aria-[current=page]:bg-main  font-normal  rounded-[6px]', pageNumber === '...' ? 'hover:text-secondary hover:bg-transparent cursor-default' : 'hover:bg-[#F2F6F6] hover:text-main ')}
                                        >
                                            {pageNumber}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))
                            }
                            <PaginationItem>
                                <PaginationNext
                                    className={cn('size-8 sm:size-10 cursor-pointer p-0 bg-transparent text-[#5C6268]  aspect-square rounded-full', totalPages == page && 'cursor-default')}
                                    onClick={() => {
                                        if (!(totalPages == page)) {
                                            dispatch({ type: PAGINATION_DISPATCH_TYPES.NEXT_PAGE })
                                        }
                                    }}
                                    disabled={totalPages == page}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    )
}

export default TablePagination