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
        profile:faker.image.urlPicsumPhotos(),
        name: i % 2 === 0 ? "Three - Tree" : "Cat - Bat - Mat",
        level: `Level 0${(i % 6) + 1}`,
        planStatus: i % 2 === 0 ? "Active" : "Inactive",
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
            </div>
            <WordPronouncesModal open={open} setOpen={setOpen} />
            <ViewWordPronouncesModal open={openView} setOpen={setOpenView} />
            <DeleteWordPronounceModal open={openDelete} setOpen={setOpenDelete} />
        </>
    );
};

export default RhymingWords;