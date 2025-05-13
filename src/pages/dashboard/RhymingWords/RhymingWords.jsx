import Datatable from "@/components/common/Datatable";
import SearchBox from "@/components/common/SearchBox";
import Button from "@/components/custom/Button";
import useColumnDef from "@/hooks/useColumnDef";
import usePagination from "@/hooks/usePagination";
import DeleteWordPronounceModal from "@/modal/DeleteWordPronounceModal";
import AddRhymingWordModal from "@/modal/AddRhymingWordModal";
import ViewWordPronouncesModal from "@/modal/ViewWordPronouncesModal";
import { PAGINATION_DISPATCH_TYPES } from "@/utils/constants";
import { faker } from "@faker-js/faker";
import React, { useEffect, useState } from "react";
import RhymingWordDetail from "@/modal/RhymingWordDetail";
import DeleteModal from "@/modal/DeleteModal";

const RhymingWords = () => {
    const [open, setOpen] = useState({ open: false, data: null });
    const [openView, setOpenView] = useState({ open: false, data: null });
    const [openDelete, setOpenDelete] = useState({ open: false, data: null });

    const total = 10;
    const {
        state: { page, limit },
        dispatch,
    } = usePagination();

    // Dummy data for Rhyming Words
    const dummyData = Array.from({ length: 10 }, (_, i) => ({
        _id: faker.database.mongodbObjectId(),
        profile: faker.image.urlPicsumPhotos(),
        name: i % 2 === 0 ? "Three - Tree" : "Cat - Bat - Mat",
        level: `Level 0${(i % 6) + 1}`,
        planStatus: i % 2 === 0 ? "Active" : "Inactive",
        words: i % 2 === 0
            ? [
                { name: "Three", image: faker.image.urlPicsumPhotos(), sound: "https://file-examples.com/storage/feba78aab06819c7996c057/2017/11/file_example_MP3_700KB.mp3" },
                { name: "Tree", image: faker.image.urlPicsumPhotos(), sound: "https://file-examples.com/storage/feba78aab06819c7996c057/2017/11/file_example_MP3_700KB.mp3" }
            ]
            : [
                { name: "Cat", image: faker.image.urlPicsumPhotos(), sound: "https://file-examples.com/storage/feba78aab06819c7996c057/2017/11/file_example_MP3_700KB.mp3" },
                { name: "Bat", image: faker.image.urlPicsumPhotos(), sound: "https://file-examples.com/storage/feba78aab06819c7996c057/2017/11/file_example_MP3_700KB.mp3" },
                { name: "Mat", image: faker.image.urlPicsumPhotos(), sound: "https://file-examples.com/storage/feba78aab06819c7996c057/2017/11/file_example_MP3_700KB.mp3" }
            ]
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
    const handleEdit = (row) => {
        setOpen({
            open: true,
            data: {
                level: row.level,
                words: row.words
            }
        });
    };
    const handleDelete = (row) => { console.log("handleDelete", row); setOpenDelete({ open: true, data: row?.name }) };

    const { rhymingWordsColumns } = useColumnDef({
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
            </div>
            <AddRhymingWordModal open={open} setOpen={setOpen} />
            <RhymingWordDetail open={openView} setOpen={setOpenView} />
            {/* <ViewWordPronouncesModal open={openView} setOpen={setOpenView} /> */}
            <DeleteModal open={openDelete} setOpen={setOpenDelete} title={openDelete?.data} name="Level" />
        </>
    );
};

export default RhymingWords;