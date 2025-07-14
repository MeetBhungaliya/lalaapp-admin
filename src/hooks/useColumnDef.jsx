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
  const cellBuilder = useCallback((props) => {
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

      rowBuilder(
        "name",
        () => <p>Name</p>,
        ({ row }) => (
          <div className="flex gap-4 items-center">
            <Image
              src={row.original.profile || null}
              className="size-12 rounded-[8px]"
              alt={`${row.original.fname} ${row.original.lname}`}
            />
            <span>{`${row.original.fname} ${row.original.lname}`}</span>
          </div>
        ),
        {
          "3xl": 500,
          default: 400,
        }
      ),

      rowBuilder(
        "email",
        () => <p>Email</p>,
        ({ getValue }) => <p>{getValue()}</p>,
        {
          "3xl": 450,
          default: 350,
        }
      ),
      rowBuilder(
        "action",
        () => <p>Action</p>,
        ({ row }) => (
          <div className="flex justify-center gap-4">
            <div
              onClick={() => fns?.handleDelete(row?.original)}
              className="bg-[#F7F7F7] rounded-[8px] p-3 shrink-0 cursor-pointer"
              type="button"
            >
              <Image src={DELETE_ICON} alt="delete" className="size-5" />
            </div>
          </div>
        ),
        {
          "3xl": null,
          default: 300,
        },
        "center"
      ),
    ],
    []
  );

  const letterSoundsColumns = useMemo(
    () => [
      rowBuilder(
        "srNo",
        "Sr. No.",
        ({ row }) => <p>{String(row.index + 1).padStart(2, "0")}</p>,
        {
          "3xl": 100,
          default: 100,
        },
        "center"
      ),
      rowBuilder(
        "wordsList",
        "Word Image",
        ({ row }) => (
          <div className="flex items-center gap-3">
            <Image
              src={row?.original?.wordsList?.[0]?.img}
              className="sm:size-[46px] size-[40px] rounded-[8px] object-cover shrink-0"
            />
          </div>
        ),
        {
          "3xl": null,
          default: 250,
        }
      ),
      rowBuilder("levelName", "Level", ({ getValue }) => <p>{getValue()}</p>, {
        "3xl": null,
        default: 250,
      }),
      rowBuilder(
        "action",
        () => <p>Actions</p>,
        ({ row }) => (
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
              onClick={() => fns?.handleDelete(row.original)}
              className="bg-[#F7F7F7] rounded-[8px] p-3 shrink-0 cursor-pointer"
              type="button"
            >
              <Image src={DELETE_ICON} alt="delete" className="size-5" />
            </div>
          </div>
        ),
        {
          "3xl": null,
          default: 300,
        },
        "center"
      ),
    ],
    [screenWidth]
  );

  const wordPronouncesColumns = useMemo(
    () => [
      rowBuilder(
        "srNo",
        "Sr. No.",
        ({ row }) => <p>{String(row.index + 1).padStart(2, "0")}</p>,
        {
          "3xl": 100,
          default: 100,
        },
        "center"
      ),
      rowBuilder(
        "wordsList",
        () => <p>Word Name</p>,
        ({ getValue }) => (
          <p className=" text-primary text-wrap break-all">
            {getValue()?.[0]?.word}
          </p>
        ),
        {
          "3xl": null,
          default: 250,
        }
      ),

      rowBuilder(
        "levelName",
        () => <p>Level</p>,
        ({ getValue }) => <p>{getValue()}</p>,
        {
          "3xl": null,
          default: 300,
        }
      ),
      rowBuilder(
        "action",
        () => <p>Actions</p>,
        ({ row }) => (
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
              onClick={() => fns?.handleDelete(row.original)}
              className="bg-[#F7F7F7] rounded-[8px] p-3 shrink-0 cursor-pointer"
              type="button"
            >
              <Image src={DELETE_ICON} alt="delete" className="size-5" />
            </div>
          </div>
        ),
        {
          "3xl": null,
          default: 300,
        },
        "center"
      ),
    ],
    [screenWidth]
  );

  const subscriptionsColumns = useMemo(
    () => [
      rowBuilder(
        "srNo",
        () => <p>Sr. No.</p>,
        ({ row }) => <p>{String(row.index + 1).padStart(2, "0")}</p>,
        {
          "3xl": 100,
          default: 100,
        },
        "center"
      ),
      rowBuilder(
        "userDtl",
        () => <p>Name</p>,
        ({ getValue, row }) => (
          <div className="flex items-center gap-3 ">
            <Image
              src={getValue()?.profile}
              alt="user profile"
              className="sm:size-[46px] size-[40px]  object-cover shrink-0 rounded-[8px]"
            />
            <p className=" text-primary text-wrap break-all">
              {getValue()?.fname} {getValue()?.lname}
            </p>
          </div>
        ),
        {
          "3xl": 500,
          "2xl": 400,
          default: 200,
        }
      ),
      rowBuilder(
        "planDtl",
        "Plan Price",
        ({ getValue }) => (
          <p className="break-all text-wrap">{getValue()?.amount}</p>
        ),
        {
          "3xl": 250,
          default: 200,
        }
      ),
      rowBuilder(
        "planStatus",
        () => <p className="-pl-1">Plan Status</p>,
        ({ getValue }) => (
          <span
            className={
              getValue() === "Active"
                ? "bg-[#E6F9ED] text-[#22C55E] rounded px-3 py-1 text-sm font-medium"
                : "bg-[#FFEAEA] text-[#FF4747] rounded px-3 py-1 text-sm font-medium"
            }
          >
            {getValue()}
          </span>
        ),
        {
          "3xl": 350,
          default: 300,
        },
        "center"
      ),
      rowBuilder(
        "action",
        () => <p>Actions</p>,
        ({ row }) => (
          <div className="flex justify-center gap-4">
            <div
              onClick={() => fns?.handleView(row?.original)}
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
        ),
        {
          "3xl": null,
          default: 300,
        },
        "center"
      ),
    ],
    [screenWidth, fns]
  );

  const rhymingWordsColumns = useMemo(
    () => [
      rowBuilder(
        "srNo",
        () => <p>Sr. No.</p>,
        ({ row }) => <p>{String(row.index + 1).padStart(2, "0")}</p>,
        {
          "3xl": 100,
          default: 100,
        },
        "center"
      ),
      rowBuilder(
        "wordsList",
        () => <p>Word Name</p>,
        ({ getValue }) => (
          <p className="text-primary text-wrap break-all">
            {getValue()
              .map((w) => w?.word)
              .join(" - ")}
          </p>
        ),
        {
          "3xl": null,
          default: 400,
        }
      ),
      rowBuilder(
        "levelName",
        "Level",
        ({ getValue }) => <p className="break-all text-wrap">{getValue()}</p>,
        {
          "3xl": null,
          default: 350,
        }
      ),
      rowBuilder(
        "action",
        () => <p>Actions</p>,
        ({ row }) => (
          <div className="flex justify-center gap-4">
            <div
              onClick={() => fns?.handleView(row?.original)}
              className="bg-[#F7F7F7] rounded-[8px] p-3 shrink-0 cursor-pointer"
              type="button"
            >
              <Image src={VIEW_ICON} alt="view" className="size-5" />
            </div>
            <div
              onClick={() => fns?.handleEdit(row?.original)}
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
        ),
        {
          "3xl": null,
          default: 300,
        },
        "center"
      ),
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
