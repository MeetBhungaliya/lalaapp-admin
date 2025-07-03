import Datatable from "@/components/common/Datatable";
import SearchBox from "@/components/common/SearchBox";
import useColumnDef from "@/hooks/useColumnDef";
import usePagination from "@/hooks/usePagination";
import DeleteModal from "@/modal/DeleteModal";
import UserDetail from "@/modal/UserDetail";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

const Subscriptions = () => {
    const [openView, setOpenView] = useState({ open: false, data: null });
    const [openDelete, setOpenDelete] = useState({ open: false, data: null });

    const total = 10;
    const {
        state: { page, limit },
        dispatch,
    } = usePagination();

    const dummyData = [
        {
            _id: faker.database.mongodbObjectId(),
            profile: faker.image.avatar(),
            name: "Craig Gouse",
            planPrice: "$49.00/month",
            planStatus: "Active",
        },
        {
            _id: faker.database.mongodbObjectId(),
            profile: faker.image.avatar(),
            name: "Jaydon Philips",
            planPrice: "$490.00/year",
            planStatus: "Expired",
        },
        {
            _id: faker.database.mongodbObjectId(),
            profile: faker.image.avatar(),
            name: "Anika Bergson",
            planPrice: "$49.00/month",
            planStatus: "Active",
        },
        {
            _id: faker.database.mongodbObjectId(),
            profile: faker.image.avatar(),
            name: "Justin Lipshutz",
            planPrice: "5 Days Trial",
            planStatus: "Expired",
        },
        {
            _id: faker.database.mongodbObjectId(),
            profile: faker.image.avatar(),
            name: "Jocelyn Bergson",
            planPrice: "$490.00/year",
            planStatus: "Active",
        },
        {
            _id: faker.database.mongodbObjectId(),
            profile: faker.image.avatar(),
            name: "Marcus Dorwart",
            planPrice: "$490.00/year",
            planStatus: "Active",
        },
    ];

    useEffect(() => {
        if (total >= 0) {
            dispatch({
                type: "SET_TOTALRECORD",
                payload: total,
            });
        }
        return () => {
            dispatch({ type: "SET_PAGE", payload: 1 });
        };
    }, [total]);

    const handleView = (row) => {
        setOpenView({ open: true, data: row });
    };

    const handleDelete = (row) => {
        setOpenDelete({ open: true, data: row?.name });
    };

    const { subscriptionsColumns } = useColumnDef({ handleView, handleDelete });

    return (
        <>
            <div className="flex-1 flex flex-col overflow-auto gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="max-w-[550px] min-w-[350px]">
                        <SearchBox />
                    </div>
                </div>
                <Datatable
                    data={dummyData}
                    columns={subscriptionsColumns}
                    title="Subscriptions"
                />
            </div>
            {/* Placeholder modals for view and delete */}
            <UserDetail open={openView} setOpen={setOpenView} />
            <DeleteModal open={openDelete} setOpen={setOpenDelete} name={"User"} title={openDelete?.data} />
        </>
    );
};

export default Subscriptions;