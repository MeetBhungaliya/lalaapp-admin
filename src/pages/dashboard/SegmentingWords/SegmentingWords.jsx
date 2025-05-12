import React, { useState } from 'react';
import SearchBox from '@/components/common/SearchBox';
import Button from '@/components/custom/Button';
import Datatable from '@/components/common/Datatable';
import { faker } from '@faker-js/faker';
import useColumnDef from '@/hooks/useColumnDef';
import AddBlendingLetter from '@/modal/AddBlendingLetter';
import BlendingLetterSoundDetail from '@/modal/BlendingLetterSoundDetail';
import DeleteModal from '@/modal/DeleteModal';
import AddSegmentingWords from '@/modal/AddSegmentingWords';
import SegmentingWordDetail from '@/modal/SegmentingWordDetail';

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
                    + Add Words
                </Button>
            </div>
            <Datatable
                data={dummyData}
                columns={rhymingWordsColumns}
                title="Segmenting Words"
            />
            {open.open && <AddSegmentingWords open={open} setOpen={setOpen} />}
            {openDetail.open && <SegmentingWordDetail open={openDetail} setOpen={setOpenDetail} />}
            {openDelete.open && <DeleteModal open={openDelete} setOpen={setOpenDelete} title={openDelete?.data?.name} />}
        </div>
    );
};

export default SegmentingWords;