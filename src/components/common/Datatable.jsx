import { cn } from '@/lib/utils'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import React from 'react'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import TablePagination from './TablePagination'

const Datatable = ({ data, columns, pagination = true, loading = false }) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })
    return (
        <div className="h-full shadow-shadow1max-sm:pb-3  rounded-[24px] p-4 pb-2 bg-white overflow-hidden flex flex-col">
            <ScrollArea className={cn('flex-1 overflow-auto')}>
                <Table className="relative">
                    <TableHeader className='[&_tr]:border-b-0  rounded-[12px] z-50 sticky top-0'>
                        {
                            table.getHeaderGroups().map((headerGroup) => (
                                <TableRow className='border-b-[0px]  rounded-[12px]  bg-ternary hover:bg-fill py-1 sm:py-2 flex items-center   shadow-none' key={headerGroup.id}>
                                    {
                                        headerGroup.headers.map((header) => {
                                            const meta = header.column.columnDef.meta;
                                            return (
                                                <TableHead
                                                    style={
                                                        {
                                                            ...(!(header.getSize()) || header.getSize() == 150 ? { width: '100%' } : { minWidth: header.getSize() + 'px' }),
                                                            ...({
                                                                justifyContent: meta?.align ?? 'start'
                                                            })
                                                        }}
                                                    className={cn('py-[12px] px-[14px] h-auto bg-transparent text-secondary  rounded-[12px]  font-medium text-[15px] sm:text-[17px] flex items-center')} key={header.id}>
                                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                                </TableHead>
                                            )
                                        })
                                    }
                                </TableRow>
                            ))
                        }
                    </TableHeader>
                    <TableBody>
                        {
                            loading ?
                                <TableRow className="h-[70vh] flex flex-col justify-center items-center">
                                    {/* <Loader /> */}
                                </TableRow> :
                                table.getRowModel()?.rows?.length > 0 ?
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow className='border-basic hover:bg-transparent flex   items-center' key={row.id}>
                                            {
                                                row.getVisibleCells().map((cell) => {
                                                    const meta = cell.column.columnDef.meta;
                                                    return (

                                                        <TableCell
                                                            style={
                                                                {
                                                                    ...(!(cell.column?.getSize()) || cell.column?.getSize() == 150 ? { width: '100%' } : { minWidth: cell.column?.getSize() + 'px' }),
                                                                    ...({
                                                                        justifyContent: meta?.align ?? 'start'
                                                                    })
                                                                }}
                                                            className={cn("flex items-center text-primary text-sm sm:text-base break-words py-5 px-[14px]", meta?.align ?? 'start')} key={cell.id}>
                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                        </TableCell>
                                                    )
                                                })
                                            }
                                        </TableRow>
                                    )) :
                                    <TableRow className="h-[70vh] flex flex-col justify-center items-center">
                                        <h2 className="text-primary text-2xl font-semibold text-center">Data Not found</h2>
                                    </TableRow>
                        }
                    </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            {pagination && <TablePagination count={data.length} />}
        </div>
    )
}

export default Datatable