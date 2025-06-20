import React, { useState } from 'react';
import SearchBox from '@/components/common/SearchBox';
import Button from '@/components/custom/Button';
import Datatable from '@/components/common/Datatable';
import { faker } from '@faker-js/faker';
import useColumnDef from '@/hooks/useColumnDef';
import DeleteModal from '@/modal/DeleteModal';
import AddSegmentingWords from '@/modal/AddSegmentingWords';
import SegmentingWordDetail from '@/modal/SegmentingWordDetail';
import AddScript from '@/modal/AddScript';
import { EDIT_WHITE_ICON } from '@/lib/images';

const generateFakeSegmentingWords = (count = 10) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: 'Cat',
        level: `Level 0${i + 1}`,
        profile: faker.image.urlPicsumPhotos(),
        sound: 'https://file-examples.com/storage/feba78aab06819c7996c057/2017/11/file_example_MP3_700KB.mp3',
    }));
};

const SegmentingWords = () => {
    const [open, setOpen] = useState({ open: false, data: null });
    const [openDetail, setOpenDetail] = useState({ open: false, data: null });
    const [openDelete, setOpenDelete] = useState({ open: false, data: null });
    const [openScript, setOpenScript] = useState({ open: false, data: null });
    const dummyData = generateFakeSegmentingWords();

    const handleEdit = (data) => {
        setOpen({ open: true, data: data });
    };

    const handleView = (data) => {
        setOpenDetail({ open: true, data: data });
    };

    const handleDelete = (data) => {
        setOpenDelete({ open: true, data: data });
    };

    const { rhymingWordsColumns } = useColumnDef({
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
                        + Add Words
                    </Button>
                </div>

                <div className="flex flex-1  overflow-hidden  gap-6 h-full">
                    {/* Datatable - 3/4 width */}
                    <div className="flex-1 w-3/4">
                        <Datatable
                            data={dummyData}
                            columns={rhymingWordsColumns}
                            title="Segmenting Words"
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
            {open.open && <AddSegmentingWords open={open} setOpen={setOpen} />}
            {openDetail.open && <SegmentingWordDetail open={openDetail} setOpen={setOpenDetail} />}
            {openDelete.open && <DeleteModal open={openDelete} setOpen={setOpenDelete} title={openDelete?.data?.name} name="Level" />}
            {
                openScript?.open && <AddScript open={openScript} setOpen={setOpenScript} />
            }
        </>
    );
};

export default SegmentingWords;