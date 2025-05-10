import Datatable from '@/components/common/Datatable';
import SearchBox from '@/components/common/SearchBox'
import Button from '@/components/custom/Button'
import useColumnDef from '@/hooks/useColumnDef';
import AddPhonemeIsolation from '@/modal/AddPhonemeIsolation';
import DeleteModal from '@/modal/DeleteModal';
import PhonemeIsolationDetail from '@/modal/PhonemeIsolationDetail';
import { faker } from '@faker-js/faker';
import React, { useState } from 'react'

const generateFakeWords = (count = 10) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: faker.person.firstName(), // or .word.noun()
        level: `Level ${String(i + 1).padStart(2, "0")}`,
        image: faker.image.urlPicsumPhotos(64, 64, true), // or use a static placeholder
        sound: "https://file-examples.com/storage/feba78aab06819c7996c057/2017/11/file_example_MP3_700KB.mp3",
        question: faker.lorem.sentence(),
    }));
};

const PhonemeIsolation = () => {
    const [open, setOpen] = useState({ open: false, data: null });
    const [openDetail, setOpenDetail] = useState({ open: false, data: null });
    const [deleteModal, setDeleteModal] = useState({ open: false, data: null });

    const dummyData = generateFakeWords();

    const handleEdit = (data) => {
        setOpen({ open: true, data: data });
    }

    const handleView = (data) => {
        setOpenDetail({ open: true, data: data });
    }

    const handleDelete = (data) => {
        setDeleteModal({ open: true, data: data });
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
                title="Rhyming Words"
            />
            {
                openDetail.open && <PhonemeIsolationDetail open={openDetail} setOpen={setOpenDetail} />
            }
            {
                open.open && <AddPhonemeIsolation open={open} setOpen={setOpen} />
            }
            {
                deleteModal.open && <DeleteModal open={deleteModal} setOpen={setDeleteModal} title={deleteModal?.data?.name} />
            }

        </div>
    )
}

export default PhonemeIsolation