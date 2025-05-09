import Image from "@/components/common/Images";
import { DELETE_ICON, EDIT_ICON, VIEW_ICON } from "@/lib/images";
import { breakpoints } from "@/lib/utils";
import { createColumnHelper } from "@tanstack/react-table";
import { Minus } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const useColumnDef = (fns) => {
  const columnHelper = createColumnHelper();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getColumnSize = (sizes) => {
    if (typeof sizes === "number") {
      return sizes;
    } else if (sizes && typeof sizes === "object") {
      const breakpointKeys = Object.keys(breakpoints).reverse();
      for (const key of breakpointKeys) {
        if (screenWidth >= breakpoints[key] && sizes[key] !== undefined) {
          return sizes[key];
        }
      }
      return sizes.default !== undefined ? sizes.default : null;
    } else {
      return null;
    }
  };
  const cellBuilder = useCallback((props, el) => {
    return props.getValue() ?? <Minus className="size-4" />;
  }, []);

  const rowBuilder = useCallback((accessor, header, cell, size = null, align = 'start') => {
    return columnHelper.accessor(accessor, {
      header, cell, size: getColumnSize(size), meta: {
        align: align
      }
    })
  }, [])
  const usersColumns = useMemo(
    () => [
      columnHelper.display({
        id: "srNo",
        header: "Sr. No.",
        cell: (props) => String(props.row.index + 1).padStart(2, "0"),
        size: 130,
      }),
      columnHelper.accessor("name", {
        header: () => <p className="pl-5">Name</p>,
        cell: (props) => (
          <div className="flex gap-4 items-center pl-5">
            <div>
              <img
                src={props.row.original.profile || null}
                className="size-12 rounded-[8px]"
              />
            </div>
            <p className="text-nowrap">{props.getValue()}</p>
          </div>
        ),
        size: getColumnSize({
          sm: 200,
          md: 240,
          lg: 280,
          xl: 320,
          "2xl": 360,
          "3xl": 400,
          default: 140,
        }),
      }),

      rowBuilder("email", "Email", cellBuilder, {
        sm: 230,
        md: 270,
        lg: 300,
        xl: 330,
        "2xl": 360,
        "3xl": 400,
        default: 180,
      }),
      columnHelper.display({
        id: "actions",
        header: "Action",
        cell: (props) => (
          <div
            onClick={() =>
              fns?.handleDelete({
                row: props.row.original,
              })
            }
            className="bg-[#F7F7F7] rounded-[8px] p-3 shrink-0 cursor-pointer"
            type="button"
          >
            <Image src={DELETE_ICON} alt="delete" className="size-5" />
          </div>
        ),
        size: {
          sm: 100,
          md: 110,
          lg: 120,
          xl: 130,
          "2xl": 140,
          default: 90,
        },

      }, "center"),
    ],
    []
  );

  const letterSoundsColumns = useMemo(
    () => [
      rowBuilder('srNo', () => <p className=''>Sr. No.</p>,
        ({ getValue, row }) => (
          <p>{String(row.index + 1).padStart(2, "0")}</p>
        ), {
        '3xl': 80,
        default: 80
      }),
      rowBuilder('name', () => <p className=''>Letter Image</p>,
        ({ getValue, row }) => (
          <div className="flex items-center gap-3 ">
            <Image src={row?.original?.image} alt="" className="sm:size-[46px] size-[40px]  object-cover shrink-0" />
            {/* <p className=" text-primary text-wrap break-all">{getValue()}</p> */}
          </div>
        ), {
        '3xl': 400,
        default: 300
      }, "center"),
      rowBuilder('level', () => <p className=''>Level</p>,
        ({ getValue, row }) => (
          <p className="pl-1">{getValue()}</p>
        ), {
        '3xl': 350,
        default: 300
      }),
      rowBuilder('action', () => <p className=''>Actions</p>,
        ({ getValue, row }) => (
          <div className="flex gap-4">
            <div
              onClick={() =>
                fns?.handleView({
                  row: row.original,
                })
              }
              className="bg-[#F7F7F7] rounded-[8px] p-3 shrink-0 cursor-pointer"
              type="button"
            >
              <Image src={VIEW_ICON} alt="view" className="size-5" />
            </div>
            <div
              onClick={() =>
                fns?.handleEdit({
                  row: row.original,
                })
              }
              className="bg-[#F7F7F7] rounded-[8px] p-3 shrink-0 cursor-pointer"
              type="button"
            >
              <Image src={EDIT_ICON} alt="edit" className="size-5" />
            </div>
            <div
              onClick={() =>
                fns?.handleDelete({
                  row: row.original,
                })
              }
              className="bg-[#F7F7F7] rounded-[8px] p-3 shrink-0 cursor-pointer"
              type="button"
            >
              <Image src={DELETE_ICON} alt="delete" className="size-5" />
            </div>
          </div>
        ), {
        '3xl': null,
        default: 300
      }, "center"),],
    []
  );

  const wordPronouncesColumns = useMemo(
    () => [
      rowBuilder('srNo', () => <p className=''>Sr. No.</p>,
        ({ getValue, row }) => (
          <p>{String(row.index + 1).padStart(2, "0")}</p>
        ), {
        '3xl': 80,
        default: 80
      }),
      rowBuilder('word', () => <p className=''>Word Name</p>,
        ({ getValue, row }) => (
          <div className="flex gap-4 items-center pl-5">
            <img
              src={row.original.image || null}
              className="size-12 rounded-[8px]"
              alt={row.original.name}
            />
            <span>{row.original.name}</span>
          </div>
        ), {
          '3xl': 400,
          default: 300
      }),
      rowBuilder('level', () => <p className=''>Level</p>,
        ({ getValue, row }) => (
          <p className="pl-7">{getValue()}</p>
        ), {
       '3xl': 350,
        default: 300
      }),
      rowBuilder('action', () => <p className=''>Actions</p>,
        ({ getValue, row }) => (
          <div className="flex gap-4">
            <div
              onClick={() =>
                fns?.handleView({
                  row: row.original,
                })
              }
              className="bg-[#F7F7F7] rounded-[8px] p-3 shrink-0 cursor-pointer"
              type="button"
            >
              <Image src={VIEW_ICON} alt="view" className="size-5" />
            </div>
            <div
              onClick={() =>
                fns?.handleEdit({
                  row: row.original,
                })
              }
              className="bg-[#F7F7F7] rounded-[8px] p-3 shrink-0 cursor-pointer"
              type="button"
            >
              <Image src={EDIT_ICON} alt="edit" className="size-5" />
            </div>
            <div
              onClick={() =>
                fns?.handleDelete({
                  row: row.original,
                })
              }
              className="bg-[#F7F7F7] rounded-[8px] p-3 shrink-0 cursor-pointer"
              type="button"
            >
              <Image src={DELETE_ICON} alt="delete" className="size-5" />
            </div>
          </div>
        ), {
        sm: 100,
        md: 110,
        lg: 120,
        xl: 130,
        "2xl": 140,
        default: 90,
      }, "center"),
    ],
    []
  );

  const subscriptionsColumns = useMemo(
    () => [
      columnHelper.display({
        id: "srNo",
        header: "Sr. No.",
        cell: (props) => String(props.row.index + 1).padStart(2, "0"),
        size: 80,
      }),
      rowBuilder('name', () => <p className=''>Name</p>,
        ({ getValue, row }) => (
          <div className="flex items-center gap-3 ">
            <Image src={row?.original?.profile} alt="" className="sm:size-[46px] size-[40px]  object-cover shrink-0" />
            <p className=" text-primary text-wrap break-all">{getValue()}</p>
          </div>
        ), {
        '3xl': 250,
        default: 200
      }),
      rowBuilder('planPrice', 'Plan Price', (props) => (
        <p className='break-all text-wrap'>{cellBuilder(props)}</p>
      ), {
        '3xl': 250,
        default: 200
      }),
      rowBuilder('planStatus', () => <p className='-pl-1'>Plan Status</p>,
        ({ getValue, row }) => (
          <span
            className={
              getValue() === "Active"
                ? "bg-[#E6F9ED] text-[#22C55E] rounded px-3 py-1 text-sm font-medium"
                : "bg-[#FFEAEA] text-[#FF4747] rounded px-3 py-1 text-sm font-medium"
            }
          >
            {getValue()}
          </span>
        ), {
        '3xl': 350,
        default: 300
      }, "center"),
      rowBuilder('action', () => <p className=''>Actions</p>,
        ({ getValue, row }) => (
          <div className="flex justify-center gap-4">
            <div
              onClick={() => fns?.handleView({ row: row.original })}
              className="bg-[#F7F7F7] rounded-[8px] p-3 shrink-0 cursor-pointer"
              type="button"
            >
              <Image src={VIEW_ICON} alt="view" className="size-5" />
            </div>
            <div
              onClick={() => fns?.handleDelete(row?.original)}
              className="bg-[#F7F7F7] rounded-[8px] p-3 shrink-0 cursor-pointer"
              type="button"
            >
              <Image src={DELETE_ICON} alt="delete" className="size-5" />
            </div>
          </div>
        ), {
        '3xl': null,
        default: 300
      }, "center"),
    ],
    [screenWidth, fns]
  );

  const rhymingWordsColumns = useMemo(
    () => [
      columnHelper.display({
        id: "srNo",
        header: "Sr. No.",
        cell: (props) => String(props.row.index + 1).padStart(2, "0"),
        size: 80,
      }),
      rowBuilder('name', () => <p className=''>Word Name</p>,
        ({ getValue, row }) => (
          <div className="flex items-center gap-3 ">
            <Image src={row?.original?.profile} alt="" className="sm:size-[46px] size-[40px] object-cover shrink-0" />
            <p className="text-primary text-wrap break-all">{getValue()}</p>
          </div>
        ), {
        '3xl': 400,
        default: 400
      }),
      rowBuilder('level', 'Level', (props) => (
        <p className='break-all text-wrap pl-1.5'>{cellBuilder(props)}</p>
      ), {
        '3xl': 350,
        default: 350
      }),
      rowBuilder('action', () => <p className=''>Actions</p>,
        ({ getValue, row }) => (
          <div className="flex justify-center gap-4">
            <div
              onClick={() => fns?.handleView({ row: row.original })}
              className="bg-[#F7F7F7] rounded-[8px] p-3 shrink-0 cursor-pointer"
              type="button"
            >
              <Image src={VIEW_ICON} alt="view" className="size-5" />
            </div>
            <div
              onClick={() => fns?.handleEdit({ row: row.original })}
              className="bg-[#F7F7F7] rounded-[8px] p-3 shrink-0 cursor-pointer"
              type="button"
            >
              <Image src={EDIT_ICON} alt="edit" className="size-5" />
            </div>
            <div
              onClick={() => fns?.handleDelete(row?.original)}
              className="bg-[#F7F7F7] rounded-[8px] p-3 shrink-0 cursor-pointer"
              type="button"
            >
              <Image src={DELETE_ICON} alt="delete" className="size-5" />
            </div>
          </div>
        ), {
        '3xl': null,
        default: 300
      }, "center"),
    ],
    [screenWidth, fns]
  );

  return {
    usersColumns,
    letterSoundsColumns,
    wordPronouncesColumns,
    subscriptionsColumns,
    rhymingWordsColumns,
  };
};

export default useColumnDef;
