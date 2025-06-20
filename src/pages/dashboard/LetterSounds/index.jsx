import Datatable from "@/components/common/Datatable";
import SearchBox from "@/components/common/SearchBox";
import Button from "@/components/custom/Button";
import useColumnDef from "@/hooks/useColumnDef";
import usePagination from "@/hooks/usePagination";
import { EDIT_WHITE_ICON } from "@/lib/images";
import AddScript from "@/modal/AddScript";
import DeleteLetterModal from "@/modal/DeleteLetterModal";
import DeleteModal from "@/modal/DeleteModal";
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
  const [openScript, setOpenScript] = useState({
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
      data: row?.name,
    });
  };

  const { letterSoundsColumns } = useColumnDef({
    handleView,
    handleEdit,
    handleDelete,
  });
  return (
    <>
      <div className="flex-1 flex flex-col overflow-hidden gap-6 p-6">
        <div className="flex  items-center justify-between">
          <div className="max-w-[550px] min-w-[350px]">
            <SearchBox />
          </div>
          <Button
            className="text-base shadow-[0px_4px_6px_0px_#8FD5FF] py-[12.5px] font-semibold sm:text-lg w-fit px-8"
            type="button"
            onClick={() => setOpen({ open: true, data: null })}
          >
            + Add Letter
          </Button>
        </div>

        <div className="flex-1 flex overflow-hidden gap-6 h-full">
          {/* Datatable - 2/3 width */}
          <div className="flex-1 w-3/4">
            <Datatable
              data={dummyData}
              columns={letterSoundsColumns}
              title="Letter Sounds"
            />
          </div>

          {/* Script Section - 1/3 width */}
          <div className="w-1/4 bg-white rounded-[24px] flex flex-col relative">
            <div className="bg-[#F2F4FC] flex justify-between items-center px-5 py-[21px] rounded-t-[24px]">
              <p className="text-lg font-medium text-black">Script</p>
              <div className="sm:size-[36px] size-[32px] rounded-[8px] shadow-[0px_4px_6px_0px_#8FD5FF] bg-main flex items-center justify-center cursor-pointer">
                <img src={EDIT_WHITE_ICON} alt="EDIT_WHITE_ICON" onClick={() => setOpenScript({ open: true, data: null })} />
              </div>
            </div>
            <div className="absolute bottom-5 flex justify-center right-34">
              <Button
                className="text-base shadow-[0px_4px_6px_0px_#8FD5FF] py-[12.5px] font-semibold sm:text-lg w-fit px-8 bg-main"
                type="button"
                // onClick={() => setOpen({ open: true, data: null })}
              >
                Delete
              </Button>
            </div>


            {/* <div className="flex-1 p-5 flex items-center justify-center">
              <p className="text-gray-500 text-sm text-center">Click the edit button to add or modify the script content.</p>
            </div> */}
          </div>
        </div>
      </div>
      <LetterSoundsModal open={open} setOpen={setOpen} />
      <ViewLetterSoundsModal open={openView} setOpen={setOpenView} />
      <DeleteModal open={openDelete} setOpen={setOpenDelete} name={"Level"} title="Apple Word" />
      {
        openScript?.open && <AddScript open={openScript} setOpen={setOpenScript} />
      }
      {/* <DeleteLetterModal open={openDelete} setOpen={setOpenDelete} /> */}
    </>

  );
};

export default LetterSounds;
