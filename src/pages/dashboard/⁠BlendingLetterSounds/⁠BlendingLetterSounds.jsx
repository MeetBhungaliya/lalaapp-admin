import React, { useState } from 'react'
import SearchBox from '@/components/common/SearchBox'
import Button from '@/components/custom/Button'
import Datatable from '@/components/common/Datatable'
import { faker } from '@faker-js/faker';
import useColumnDef from '@/hooks/useColumnDef';
import AddBlendingLetter from '@/modal/AddBlendingLetter';
import BlendingLetterSoundDetail from '@/modal/BlendingLetterSoundDetail';
import DeleteModal from '@/modal/DeleteModal';

const generateFakeWords = (count = 10) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: faker.person.firstName(), // or .word.noun()
        level: `Level ${String(i + 1).padStart(2, "0")}`,
        // image: faker.image.urlPicsumPhotos(64, 64, true), // or use a static placeholder
        sound: "https://file-examples.com/storage/feba78aab06819c7996c057/2017/11/file_example_MP3_700KB.mp3",
        question: faker.lorem.sentence(),
    }));
};


const BlendingLetterSounds = () => {
    const [open, setOpen] = useState({ open: false, data: null });
    const [openDetail, setOpenDetail] = useState({ open: false, data: null });
    const [openDelete, setOpenDelete] = useState({ open: false, data: null });
    const dummyData = generateFakeWords();

    const handleEdit = (data) => {
        setOpen({ open: true, data: data });
    }

    const handleView = (data) => {
        setOpenDetail({ open: true, data: data });
    }

    const handleDelete = (data) => {
        setOpenDelete({ open: true, data: data });
    }


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
                    className="text-base shadow-[0px_4px_6px_0px_#8FD5FF] py-[12.5px] font-semibold sm:text-lg w-fit px-8"
                    type="button"
                    onClick={() => setOpen({ open: true, data: null })}
                >
                    + Add Words
                </Button>
            </div>
            <Datatable
                data={dummyData}
                columns={rhymingWordsColumns}
                title="Rhyming Words"
            />
            {
                open.open && <AddBlendingLetter open={open} setOpen={setOpen} />
            }
            {
                openDetail.open && <BlendingLetterSoundDetail open={openDetail} setOpen={setOpenDetail} />
            }
            {
                openDelete.open && <DeleteModal open={openDelete} setOpen={setOpenDelete} title={openDelete?.data?.name} name="Level" />
            }
        </div>
    )
}

export default BlendingLetterSounds;
