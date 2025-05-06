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

  const rowBuilder = useCallback(
    (accessor, header, cell, size = null, align = "start") => {
      return columnHelper.accessor(accessor, {
        header,
        cell,
        size: getColumnSize(size),
        meta: {
          align: align,
        },
      });
    },
    []
  );

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
        meta: {
          align: "center",
        },
      }),
    ],
    []
  );

  const letterSoundsColumns = useMemo(
    () => [
      columnHelper.display({
        id: "srNo",
        header: "Sr. No.",
        cell: (props) => String(props.row.index + 1).padStart(2, "0"),
        size: 80,
      }),
      columnHelper.accessor("image", {
        header: () => <p className="pl-5">Letter Image</p>,
        cell: (props) => (
          <div className="flex gap-4 items-center pl-5">
            <img
              src={props.row.original.image || null}
              className="size-12 rounded-[8px]"
            />
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
        meta: {
          align: "center",
        },
      }),

      rowBuilder("level", "Level", cellBuilder, {
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
          <div className="flex gap-4">
            <div
              onClick={() =>
                fns?.handleView({
                  row: props.row.original,
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
                  row: props.row.original,
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
                  row: props.row.original,
                })
              }
              className="bg-[#F7F7F7] rounded-[8px] p-3 shrink-0 cursor-pointer"
              type="button"
            >
              <Image src={DELETE_ICON} alt="delete" className="size-5" />
            </div>
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
        meta: {
          align: "center",
        },
      }),
    ],
    []
  );

  const wordPronouncesColumns = useMemo(
    () => [
      columnHelper.display({
        id: "srNo",
        header: "Sr. No.",
        cell: (props) => String(props.row.index + 1).padStart(2, "0"),
        size: 80,
      }),
      columnHelper.accessor("word", {
        header: () => <p className="pl-5">Word Name</p>,
        cell: (props) => (
          <div className="flex gap-4 items-center pl-5">
            <img
              src={props.row.original.image || null}
              className="size-12 rounded-[8px]"
              alt={props.row.original.name}
            />
            <span>{props.row.original.name}</span>
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
      rowBuilder("level", "Level", cellBuilder, {
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
          <div className="flex gap-4">
            <div
              onClick={() =>
                fns?.handleView({
                  row: props.row.original,
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
                  row: props.row.original,
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
                  row: props.row.original,
                })
              }
              className="bg-[#F7F7F7] rounded-[8px] p-3 shrink-0 cursor-pointer"
              type="button"
            >
              <Image src={DELETE_ICON} alt="delete" className="size-5" />
            </div>
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
        meta: {
          align: "center",
        },
      }),
    ],
    []
  );

  return {
    usersColumns,
    letterSoundsColumns,
    wordPronouncesColumns,
  };
};

export default useColumnDef;
