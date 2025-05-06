import Datatable from "@/components/common/Datatable";
import SearchBox from "@/components/common/SearchBox";
import Button from "@/components/custom/Button";
import useColumnDef from "@/hooks/useColumnDef";
import usePagination from "@/hooks/usePagination";
import DeleteLetterModal from "@/modal/DeleteLetterModal";
import LetterSoundsModal from "@/modal/letterSoundsModal";
import ViewLetterSoundsModal from "@/modal/ViewLetterSoundsModal";
import { PAGINATION_DISPATCH_TYPES } from "@/utils/constants";
import { faker } from "@faker-js/faker";
import React, { useEffect, useState } from "react";

const LetterSounds = () => {
  const [open, setOpen] = useState({
    open: false,
    data: null,
  });
  const [openView, setOpenView] = useState({
    open: false,
    data: null,
  });
  const [openDelete, setOpenDelete] = useState({
    open: false,
    data: null,
  });


  const total = 10;
  const {
    state: { page, limit },
    dispatch,
  } = usePagination();

  const dummyData = Array.from({ length: 10 }, () => ({
    _id: faker.database.mongodbObjectId(),
    image: faker.image.avatar(),
    level: `Level ${faker.number.int({ min: 1, max: 30 })}`,
  }));

  useEffect(() => {
    if (total >= 0) {
      dispatch({
        type: PAGINATION_DISPATCH_TYPES.SET_TOTALRECORD,
        payload: total,
      });
    }
    return () => {
      dispatch({ type: PAGINATION_DISPATCH_TYPES.SET_PAGE, payload: 1 });
    };
  }, [total]);

  const handleView = (row) => {
    console.log(row);
    setOpenView({
      open: true,
      data: row,
    });
  };

  const handleEdit = (row) => {
    setOpen({
      open: true,
      data: row,
    });
  };

  const handleDelete = (row) => {
    setOpenDelete({
      open: true,
      data: row,
    });
  };

  const { letterSoundsColumns } = useColumnDef({
    handleView,
    handleEdit,
    handleDelete,
  });
  return (
    <>
      <div className="flex-1 flex flex-col overflow-auto gap-6 p-6">
        <div className="flex items-center justify-between">
          <div className="max-w-[550px] min-w-[350px]">
            <SearchBox />
          </div>
          <Button
            className="text-base max-sm:py-[13.5px] font-semibold sm:text-lg w-fit px-8"
            type="button"
            onClick={() => setOpen({ open: true, data: null })}
          >
            + Add Letter
          </Button>
        </div>

        <Datatable
          data={dummyData}
          columns={letterSoundsColumns}
          title="Letter Sounds"
        />
      </div>
      <LetterSoundsModal open={open} setOpen={setOpen} />
      <ViewLetterSoundsModal open={openView} setOpen={setOpenView} />
      <DeleteLetterModal open={openDelete} setOpen={setOpenDelete} />
    </>

  );
};

export default LetterSounds;
