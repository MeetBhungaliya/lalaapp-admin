import Datatable from '@/components/common/Datatable';
import SearchBox from '@/components/common/SearchBox'
import Button from '@/components/custom/Button'
import useColumnDef from '@/hooks/useColumnDef';
import AddPhonemeIsolation from '@/modal/AddPhonemeIsolation';
import DeleteModal from '@/modal/DeleteModal';
import PhonemeIsolationDetail from '@/modal/PhonemeIsolationDetail';
import { faker } from '@faker-js/faker';
import React, { useState } from 'react'
import AddScript from '@/modal/AddScript';
import { EDIT_WHITE_ICON } from '@/lib/images';

const generateFakeWords = (count = 10) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: faker.person.firstName(), // or .word.noun()
        level: `Level ${String(i + 1).padStart(2, "0")}`,
        profile: faker.image.urlPicsumPhotos(64, 64, true), // or use a static placeholder
        sound: "https://file-examples.com/storage/feba78aab06819c7996c057/2017/11/file_example_MP3_700KB.mp3",
        question: faker.lorem.sentence(),
    }));
};

const PhonemeIsolation = () => {
    const [open, setOpen] = useState({ open: false, data: null });
    const [openDetail, setOpenDetail] = useState({ open: false, data: null });
    const [deleteModal, setDeleteModal] = useState({ open: false, data: null });
    const [openScript, setOpenScript] = useState({ open: false, data: null });

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

                <div className="flex-1 flex overflow-hidden gap-6 h-full">
                    {/* Datatable - 3/4 width */}
                    <div className="flex-1 w-3/4">
                        <Datatable
                            data={dummyData}
                            columns={rhymingWordsColumns}
                            title="Phoneme Isolation"
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
            {
                openDetail.open && <PhonemeIsolationDetail open={openDetail} setOpen={setOpenDetail} />
            }
            {
                open.open && <AddPhonemeIsolation open={open} setOpen={setOpen} />
            }
            {
                deleteModal.open && <DeleteModal open={deleteModal} setOpen={setDeleteModal} title={deleteModal?.data?.name} name="Level" />
            }
            {
                openScript?.open && <AddScript open={openScript} setOpen={setOpenScript} />
            }
        </>
    )
}

export default PhonemeIsolation