import Datatable from "@/components/common/Datatable";
import SearchBox from "@/components/common/SearchBox";
import Button from "@/components/custom/Button";
import useColumnDef from "@/hooks/useColumnDef";
import usePagination from "@/hooks/usePagination";
import DeleteWordPronounceModal from "@/modal/DeleteWordPronounceModal";
import WordPronouncesModal from "@/modal/WordPronouncesModal";
import ViewWordPronouncesModal from "@/modal/ViewWordPronouncesModal";
import { PAGINATION_DISPATCH_TYPES } from "@/utils/constants";
import { faker } from "@faker-js/faker";
import React, { useEffect, useState } from "react";
import DeleteModal from "@/modal/DeleteModal";
import AddScript from "@/modal/AddScript";
import { EDIT_WHITE_ICON } from "@/lib/images";

const WordPronounces = () => {
  const [open, setOpen] = useState({ open: false, data: null });
  const [openView, setOpenView] = useState({ open: false, data: null });
  const [openDelete, setOpenDelete] = useState({ open: false, data: null });
  const [openScript, setOpenScript] = useState({ open: false, data: null });

  const total = 10;
  const {
    state: { page, limit },
    dispatch,
  } = usePagination();

  const dummyData = Array.from({ length: 10 }, () => ({
    _id: faker.database.mongodbObjectId(),
    image: faker.image.avatar(),
    name: faker.word.noun(),
    level: `Level ${faker.number.int({ min: 1, max: 30 })}`,
    sound:
      "https://file-examples.com/storage/feba78aab06819c7996c057/2017/11/file_example_MP3_700KB.mp3",
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

  const handleView = (row) => setOpenView({ open: true, data: row });
  const handleEdit = (row) => setOpen({ open: true, data: row });
  const handleDelete = (row) => setOpenDelete({ open: true, data: row });

  const { wordPronouncesColumns } = useColumnDef({
    handleView,
    handleEdit,
    handleDelete,
  });

  return (
    <>
      <div className="flex-1 flex flex-col overflow-hidden gap-6 p-6">
        <div className="flex items-center justify-between">
          <div className="max-w-[550px] min-w-[350px]">
            <SearchBox />
          </div>
          <Button
            className="text-base shadow-[0px_4px_6px_0px_#8FD5FF] py-[12.5px] font-semibold sm:text-lg w-fit px-8"
            type="button"
            onClick={() => setOpen({ open: true, data: null })}
          >
            + Add Word
          </Button>
        </div>

        <div className="flex-1 flex overflow-hidden gap-6 h-full">
          {/* Datatable - 3/4 width */}
          <div className="flex-1 w-3/4">
            <Datatable
              data={dummyData}
              columns={wordPronouncesColumns}
              title="Word Pronounces"
            />
          </div>

          {/* Script Section - 1/4 width */}
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
          </div>
        </div>
      </div>
      <WordPronouncesModal open={open} setOpen={setOpen} />
      <ViewWordPronouncesModal open={openView} setOpen={setOpenView} />
      {
        openDelete.open && <DeleteModal open={openDelete} setOpen={setOpenDelete} title={openDelete.data?.name} name="Level" />
      }
      {
        openScript?.open && <AddScript open={openScript} setOpen={setOpenScript} />
      }
      {/* <DeleteWordPronounceModal open={openDelete} setOpen={setOpenDelete} /> */}
    </>
  );
};

export default WordPronounces;
