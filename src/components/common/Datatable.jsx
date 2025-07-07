import { cn } from "@/lib/utils";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import TablePagination from "./TablePagination";
import { NO_DATA_FOUND } from "@/lib/images";
import Image from "@/components/common/Images";

const Datatable = ({
  data,
  columns,
  pagination = true,
  loading = false,
  title,
}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="h-full rounded-[24px] p-0 bg-white overflow-hidden flex flex-col">
      <ScrollArea className={cn("flex-1 overflow-auto")}>
        <Table className="relative">
          <TableHeader className="[&_tr]:border-b-0  rounded-[12px] z-50 sticky top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="border-b-[0px]  rounded-t-[12px]  bg-[#F2F4FC] hover:bg-fill py-1 sm:py-2 flex items-center   shadow-none"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => {
                  const meta = header.column.columnDef.meta;
                  return (
                    <TableHead
                      style={{
                        ...(!header.getSize() || header.getSize() == 150
                          ? { width: "100%" }
                          : { minWidth: header.getSize() + "px" }),
                        ...{
                          justifyContent: meta?.align ?? "start",
                        },
                      }}
                      className={cn(
                        "py-[15px] px-[26px] h-auto bg-transparent text-[#1F1F24] rounded-[12px] font-semibold text-sm sm:text-[16px] flex items-center"
                      )}
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              [...Array.from({ length: 10 })].map((_, index) => (
                <TableRow
                  key={index}
                  className="border-basic hover:bg-fill flex items-center"
                >
                  {columns.map((col, colIndex) => {
                    const randomWidth = `${
                      Math.floor(Math.random() * 50) + 50
                    }%`;
                    return (
                      <TableCell
                        key={colIndex}
                        className="px-3"
                        style={{
                          ...(!col.size || col.size == 150
                            ? { width: "100%" }
                            : { minWidth: col.size + "px" }),
                          ...{
                            justifyContent: col?.align ?? "start",
                          },
                        }}
                      >
                        <div
                          style={{ width: randomWidth }}
                          className="h-[72px] bg-[#7E808C] opacity-20 rounded-sm animate-pulse"
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : table.getRowModel()?.rows?.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="border-basic hover:bg-fill flex items-center"
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => {
                    const meta = cell.column.columnDef.meta;
                    return (
                      <TableCell
                        style={{
                          ...(!cell.column?.getSize() ||
                          cell.column?.getSize() == 150
                            ? { width: "100%" }
                            : { minWidth: cell.column?.getSize() + "px" }),
                          ...{
                            justifyContent: meta?.align ?? "start",
                          },
                        }}
                        className={cn(
                          "flex items-center text-primary text-base sm:text-lg break-words py-5 px-[26px] font-medium",
                          meta?.align ?? "start"
                        )}
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow className="h-[60vh] hover:bg-transparent flex flex-col gap-6 justify-center items-center">
                <Image src={NO_DATA_FOUND} alt="no data found" />
                <h2 className="text-primary text-2xl font-semibold text-center">
                  No {title}
                </h2>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {pagination && <TablePagination count={data.length} loading={loading} />}
    </div>
  );
};
export default Datatable;
