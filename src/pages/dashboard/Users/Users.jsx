import Datatable from "@/components/common/Datatable";
import SearchBox from "@/components/common/SearchBox";
import useColumnDef from "@/hooks/useColumnDef";
import usePagination from "@/hooks/usePagination";
import DeleteUserModal from "@/modal/DeleteUserModal";
import { PAGINATION_DISPATCH_TYPES } from "@/utils/constants";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

const Users = () => {
  const [open, setOpen] = useState({
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
    profile: faker.image.personPortrait(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
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

  const handleDelete = (row) => {
    setOpen({
      open: true,
      data: row?.row?.name,
    });
  };

  const { usersColumns } = useColumnDef({
    handleDelete,
  });
  return (
    <>
      <div className="flex-1 flex flex-col overflow-auto gap-6 p-6">
        <div className="max-w-[350px]">
          <SearchBox />
        </div>

        <Datatable data={dummyData} columns={usersColumns} title="Users" />
      </div>
      <DeleteUserModal open={open} setOpen={setOpen} />
    </>
  );
};

export default Users;
